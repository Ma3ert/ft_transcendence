import {
  Button,
  Grid,
  GridItem,
  Image,
  Stack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import SoloLobbyParty from "./SoloLobbyParty";
import MultiLobbyParty from "./MultiLobbyParty";
import socket from "./GameComponents/socket";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import useGame from "@/hooks/useGame";
import axios from "axios";
import ProgressLevel from "./ProgressLevel";

type Props = {
  username: string;
  ready: boolean;
  other: string;
  otherReady: boolean;
  alone: boolean;
};

const LobbyParty = () => {
  const shadow = useBreakpointValue({ base: true, xl: false });
  const mobile = useBreakpointValue({ base: true, md: false });
  const { currentUser, updateUser } = useAuth();
  const toast = useToast();
  const [party, setPartyState] = useState(true);
  const router = useRouter();
  const [opponent, setOppenent] = useState({
    username: "no player",
    ready: false,
  });
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const [matchMade, setMatch] = useState(null);
  const [ready, setReady] = useState(false);
  const { setGameSettings } = useGame();
  const [readyness, setReadyness] = useState(false);
  var interval: NodeJS.Timeout;

  useEffect(() => {
    if (socket)
    {
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
  
      socket.on("onGoingMatch", () => {
        !toast.isActive("pop") &&
          toast({
            id: "pop",
            title: "You cannot join the queue you already in game session",
            isClosable: true,
            status: "error",
          });
        // setMessage("You cannot join the queue you already in game session");
        // setVisible(false);
      });
  
      socket.on("joinedGameQueue", () => {
        setMessage("Waiting for other players...");
        setReady(true);
        setVisible(false);
        // interval = setInterval(() => {party ? setPartyState(false) : setPartyState(true)}, 800)
      });
  
      socket.on("noPlayersAvailable", () => {
        clearInterval(interval);
        setReady(false);
        // setPartyState(true)
        !toast.isActive("pop") &&
          toast({
            id: "pop",
            title: "No players are available for the moment, try again later.",
            isClosable: true,
            status: "info",
          });
        // setMessage("No players are available for the moment, try again later.");
        //   setTimeout(() => {
        //       setMessage("");
        //       setVisible(true);
        //   }, 3000);
      });
  
      socket.on("userLeftGame", () => {
        !toast.isActive("pop") &&
          toast({
            id: "pop",
            title: "Other player has left the game",
            isClosable: true,
            status: "info",
          });
        // setVisible(false);
        // setMessage("Other player has left the game");
        // setTimeout(() => {
        //     setMessage("");
        //     setVisible(true);
        // }, 3000);
      });
  
      socket.on("matchMade", ({ data }) => {
        // ////console.log(data);
        // setMessage("");
        setOppenent({ username: data.username, ready: true });
        setReadyness(true);
        setPartyState(false);
        setMatch(data);
        setGameSettings({
          gameID: data.session,
          playerID: data.playerID,
          me: {
            username: currentUser.user.username,
            avatar: currentUser.user.avatar,
          },
          opponent: { username: data.username, avatar: data.avatar },
        });
        setTimeout(() => {
          clearInterval(interval);
          router.push("/Game");
        }, 3000);
      });
  
      socket.on("connect", () => {
        if (!(socket && socket.connected)) {
          // setMessage("Error connecting to the sockets server");
          // setVisible(false);
          !toast.isActive("pop") &&
            toast({
              id: "pop",
              title: "Error connecting to the sockets server",
              isClosable: true,
              status: "error",
            });
        }
      });

    }
  }, []);

  const handleJoinQueue = () => {
    if (!(socket && socket.connected)) {
      !toast.isActive("pop") &&
        toast({
          id: "pop",
          title: "Error connecting to the game server please refresh...",
          isClosable: true,
          status: "error",
        });
      setVisible(false);
      return setMessage(
        "Error connecting to the game server please refresh..."
      );
    }
    setVisible(false);
    setReadyness(true);
    socket && socket.emit("gameJoinQueue");
  };

  return (
    <Grid templateColumns={"repeat(8, 1fr)"} placeItems="center">
      <GridItem colSpan={{ base: 8, lg: 2 }}>
        <ProgressLevel />
      </GridItem>

      <GridItem colSpan={{ base: 8, lg: 4 }} justifyContent={"center"}>
        <Stack spacing={{ base: "40px", xl: "52px" }} align={"center"}>
          <MultiLobbyParty
            username={currentUser.user.username}
            ready={readyness}
            other={opponent.username}
            otherReady={opponent.ready}
            alone={party}
          />
          {!shadow && <Image src="/Shadow.png" w={"341px"} h={"auto"}></Image>}
        </Stack>
      </GridItem>

      {!mobile && (
        <GridItem colSpan={{ base: 8, lg: 2 }} justifyContent={"center"}>
          <Button
            variant={"primary"}
            w={{ base: "150px", md: "150px", lg: "217px" }}
            h={"60px"}
            fontSize={"25px"}
            onClick={handleJoinQueue}
            isDisabled={ready}
          >
            Ready
          </Button>
        </GridItem>
      )}
    </Grid>
  );
};

export default LobbyParty;
