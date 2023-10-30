import { useContext, useEffect, useRef, useState } from "react";
import Ball from "./ball";
import Player from "./player";
import GameHeader from "./GameHeader";
import { Box, Stack, useToast } from "@chakra-ui/react";
import useGame from "@/hooks/useGame";
import socket from "./socket";
import "@/theme/styles.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import { FaTrophy } from "react-icons/fa";
import {
  useDisclosure,
  Wrap,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Text,
} from "@chakra-ui/react";
import { UsersContext } from "@/context/Contexts";

export interface Game {
  playerOne: Player;
  playerTwo: Player;
  ball: Ball;
  gameID: String | null;
  playerID: number;
  isGameStarted: Boolean;
}

const Game = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [win, setWin] = useState(true);
  const toast = useToast();
  const ref = useRef(null);
  const router = useRouter();
  const [message, setMessage] = useState("Waiting for game to start");
  const { gameSettings } = useGame();
  console.log("gameSetting: ", gameSettings)
  const [score, setScore] = useState({});
  const [finalScore, setFinalScore] = useState("");
  const { currentUser, updateUser } = useAuth();
  const { onClose: CloseHandler } = useContext(UsersContext);
  const [game] = useState<Game>({
    playerOne: new Player(0, 200, 20, 100, "transparent", 1),
    playerTwo: new Player(780, 200, 20, 100, "transparent", 2),
    ball: new Ball(400, 245, 10, "transparent"),
    isGameStarted: false,
    playerID: gameSettings.playerID,
    gameID: gameSettings.gameID,
  });

  const degage = () => {
    !toast.isActive("pop") &&
      toast({
        id: "pop",
        title: "Achivement",
        description: win
          ? "Congrats. You WON a game"
          : "Bitch. You LOST a game",
        status: win ? "success" : "error",
        icon: <FaTrophy />,
      });
      console.log("i get here1")
    router.push("/Lobby");
    
  };

  const paint = (context: any) => {
    if (game.isGameStarted) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      game.playerOne.draw(context);
      game.playerTwo.draw(context);
      game.ball.draw(context);

      context.strokeStyle = "white";
      context.beginPath();
      context.setLineDash([10, 10]);
      context.moveTo(400, 5);
      context.lineTo(400, 495);
      context.stroke();
    }
  };

  const clearCanvas = (context: any) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  useEffect(() => {
    if (!gameSettings.playerID || !gameSettings.gameID)
      router.push("/Lobby");
    const canvas: any = ref.current;
    const context = canvas.getContext("2d");

    socket.on("connect", () => {
      if (!socket.connected) {
        !toast.isActive("pop") &&
          toast({
            id: "pop",
            title: "Error connecting to the server",
            status: "error",
          });
        setMessage("Error connecting to the server");
        router.push("/Lobby");

      }
    });

    socket.on("userLeftGame", () => {
      game.isGameStarted = false;
      clearCanvas(context);
      !toast.isActive("pop") &&
        toast({
          id: "pop",
          title: "other player has left the game",
          status: "error",
        });
      setMessage("Other player has left the game");
      setTimeout(() => {
        router.push("/Lobby");
      }, 5000);
    });

    socket.on("score", (data) => {
      setScore(data);
    });

    socket.on("startGameSession", () => {
      CloseHandler!();
      setMessage("");
      var theme = { one: "#DC585B", two: "#D9D9D9", ball: "#D9D9D9" };

      const cookieValue = Cookies.get("theme");
      if (cookieValue !== undefined) {
        ////console.log(cookieValue)
        if (cookieValue !== "") {
          theme = JSON.parse(cookieValue);
        }
      }
      game.playerOne = new Player(0, 200, 20, 100, theme.one, 1);
      game.playerTwo = new Player(780, 200, 20, 100, theme.two, 2);
      game.ball = new Ball(400, 245, 10, theme.ball);

      game.isGameStarted = true;

      window.addEventListener("keydown", (e) => {
        if (game.isGameStarted) {
          if (e.key === "ArrowUp") {
            socket.emit("gameMovePlayer", {
              gameSession: game.gameID,
              player: game.playerID,
              key: "up",
            });
          } else if (e.key === "ArrowDown") {
            socket.emit("gameMovePlayer", {
              gameSession: game.gameID,
              player: game.playerID,
              key: "down",
            });
          }
        }
      });
      paint(context);
    });

    const itemCounter = (value: any, index: any) => {
      return value.filter((x: any) => x == index).length;
    };
    socket.on("endGame", (room) => {
      ////console.log(room);
      clearCanvas(context);
      game.isGameStarted = false;
      updateUser && updateUser();
      if (game.playerID === room.winner) {
        setMessage("Congrats. You WON this game");
        setWin(true);
      } else {
        setMessage("Bitch. You LOST this game");
        setWin(false);
      }
      setFinalScore(
        itemCounter(room.players[0].score, "W").toString() +
          " - " +
          itemCounter(room.players[1].score, "W").toString()
      );
      onOpen();
    });

    socket.on("updateGame", (room) => {
      game.playerOne.y = room.players[0].y;
      game.playerTwo.y = room.players[1].y;

      game.ball.x = room.ball.x;
      game.ball.y = room.ball.y;
      paint(context);
    });
  }, []);

  return (
    <Stack direction="column" align="center" justify="center" minH="70vh">
      {/* <p id="messageArea">{message}</p> */}
      <div id="body">
        <Box backgroundColor="#1D222C" padding="2rem" borderRadius={12}>
          <GameHeader
            score={score}
            playerID={gameSettings.playerID}
            user={gameSettings.me}
            opponent={gameSettings.opponent}
          />
          <canvas id="gameFrame" width={800} height={500} ref={ref} />
        </Box>
      </div>
      <Modal
        closeOnOverlayClick={false}
        variant={"form"}
        isOpen={isOpen}
        onClose={onClose}
        size={"invite"}
      >
        <ModalOverlay />
        <ModalContent style={{ width: "480px", height: "280px" }}>
          <ModalBody>
            <Stack align={"center"} spacing={"25px"} fontFamily={"visbyRound"}>
              <Text color={"#d9d9d9"} fontSize={"25px"}>
                {message}
              </Text>
              <Text color={"#d9d9d9"} fontSize={"25px"}>
                {"Match Result: " + finalScore}
              </Text>
              <Button
                variant={"primary"}
                width={{ base: "150px", md: "200px" }}
                height={{ base: "40px", md: "50px" }}
                fontSize={{ base: "12px", md: "15px" }}
                onClick={() => degage()}
              >
                Go Back to Lobby
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Game;
