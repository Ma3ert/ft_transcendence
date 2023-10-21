import { useEffect, useRef, useState } from "react";
import Ball from "./ball";
import Player from "./player";
import GameHeader from "./GameHeader";
import { Box, useToast } from "@chakra-ui/react";
import useGame from "@/hooks/useGame";
import socket from './socket';
import { useRouter } from "next/navigation";

export interface Game {
    playerOne: Player;
    playerTwo: Player;
    ball: Ball;
    gameID: String | null;
    playerID: number;
    isGameStarted: Boolean;
}

const Game = () => {
    const toast = useToast();
    const ref = useRef(null);
    const router = useRouter()
    const [message, setMessage] = useState("Waiting for game to start");
    const { gameSettings } = useGame();
    const [score, setScore] = useState({});
    const [game] = useState<Game>({
        playerOne: new Player(0, 200, 20, 100, "transparent", 1),
        playerTwo: new Player(780, 200, 20, 100, "transparent", 2),
        ball: new Ball(400, 245, 10, "transparent"),
        isGameStarted: false,
        playerID: gameSettings.playerID,
        gameID: gameSettings.gameID,
    });


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
        if (!gameSettings.playerID || !gameSettings.gameID) router.push("/Lobby");
        const canvas: any = ref.current;
        const context = canvas.getContext("2d");

        socket.on("connect", () => {
            if (!socket.connected) 
            {
                !toast.isActive("pop") && toast({
                    id: "pop",
                    title: "Error connecting to the server",
                    status:"error"
                })
                setMessage("Error connecting to the server");
                router.push("/Lobby")
            }
        });

        socket.on("userLeftGame", () => {
            game.isGameStarted = false;
            clearCanvas(context);
            !toast.isActive("pop") && toast({
                id: "pop",
                title: "other player has left the game",
                status:"error"
            })
            setMessage("Other player has left the game");
            setTimeout(() => {
                router.push("/Lobby");
            }, 5000);
        });

        socket.on("score", (data) => {
            setScore(data);
        })

        socket.on("startGameSession", () => {
            setMessage("");
            console.log("i get here")

            game.playerOne = new Player(0, 200, 20, 100, "#DC585B", 1);
            game.playerTwo = new Player(780, 200, 20, 100, "#D9D9D9", 2);
            game.ball = new Ball(400, 245, 10, "#D9D9D9");

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

        socket.on("endGame", (room) => {
            console.log(room);
            clearCanvas(context);
            game.isGameStarted = false;
            if (game.playerID === room.winner) {
                !toast.isActive("pop") && toast({
                    id: "pop",
                    title: "Congrats. You won this game",
                    status:"success"
                })
                return setMessage("Congrats. You won this game");
            }
            !toast.isActive("pop") && toast({
                id: "pop",
                title: "Bitch, you lost this game",
                status:"warning"
            })
            setMessage("Bitch. You lost this game");
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
        <>
            <p id="messageArea">{message}</p>
            <div id="body">
                <Box backgroundColor="#1D222C" padding="2rem" borderRadius={12}>
                    <GameHeader score={score} playerID={gameSettings.playerID} user={gameSettings.me} opponent={gameSettings.opponent} />
                    <canvas id="gameFrame" width={800} height={500} ref={ref} />
                </Box>
            </div>
        </>
    );
};

export default Game;
