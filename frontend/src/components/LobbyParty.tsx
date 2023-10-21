import { Button, Image, Stack, useBreakpointValue, useToast } from '@chakra-ui/react'
import React from 'react'
import SoloLobbyParty from './SoloLobbyParty';
import MultiLobbyParty from './MultiLobbyParty';
import socket from './GameComponents/socket';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import useGame from '@/hooks/useGame';
import axios from 'axios';

type Props = {
  username: string;
  ready: boolean;
  other: string;
  otherReady: boolean
  alone: boolean;
}

const LobbyParty = () => {
  const shadow = useBreakpointValue({base: true, xl: false})
  const {currentUser, updateUser} = useAuth();
  const toast = useToast();
  const [party, setPartyState] = useState(true);
  const router = useRouter();
  const [opponent, setOppenent] = useState({username: "no player", ready: false})
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const [matchMade, setMatch] = useState(null);
  const [ready, setReady] = useState(false)
  const { setGameSettings } = useGame();
  const [readyness, setReadyness] = useState(false)
  var interval: NodeJS.Timeout;
  
  useEffect(() => {
  socket.on("onGoingMatch", () => {
      !toast.isActive("pop") && toast({
        id: "pop",
        title: "You cannot join the queue you already in game session",
        isClosable: true,
        status: "error"
      })
      // setMessage("You cannot join the queue you already in game session");
      // setVisible(false);
  });

  socket.on("joinedGameQueue", () => {
      setMessage("Waiting for other players...");
      setReady(true)
      setVisible(false);
      // interval = setInterval(() => {party ? setPartyState(false) : setPartyState(true)}, 800)
  });

  socket.on("noPlayersAvailable", () => {
    clearInterval(interval)
    setReady(false)
    // setPartyState(true)
    !toast.isActive("pop") && toast({
      id: "pop",
      title: "No players are available for the moment, try again later.",
      isClosable: true,
      status: "info"
    })
    // setMessage("No players are available for the moment, try again later.");
    //   setTimeout(() => {
    //       setMessage("");
    //       setVisible(true);
    //   }, 3000);
  });

  socket.on("userLeftGame", () => {
      !toast.isActive("pop") && toast({
        id: "pop",
        title: "Other player has left the game",
        isClosable: true,
        status: "info"
      })
      // setVisible(false);
      // setMessage("Other player has left the game");
      // setTimeout(() => {
      //     setMessage("");
      //     setVisible(true);
      // }, 3000);
  });

  socket.on("matchMade", ({ data }) => {
      // console.log(data);
      // setMessage("");
      setOppenent({username: data.username, ready: true})
      setReadyness(true)
      setPartyState(false)
      setMatch(data);
      setGameSettings({
        gameID: data.session,
        playerID: data.playerID,
        me: { username: currentUser.username, avatar: currentUser.avatar },
        opponent: { username: data.username, avatar: data.avatar },
      });
      setTimeout(() => {
        clearInterval(interval)
        router.push("/Game");
      }, 3000);
  });

    socket.on("connect", () => {
        if (!socket.connected) {
            // setMessage("Error connecting to the sockets server");
            // setVisible(false);
          !toast.isActive("pop") && toast({
            id: "pop",
            title: "Error connecting to the sockets server",
            isClosable: true,
            status: "error"
          })
        }
    });
  }, []);

  const handleJoinQueue = () => {
      if (!socket.connected) {
        !toast.isActive("pop") && toast({
          id: "pop",
          title: "Error connecting to the game server please refresh...",
          isClosable: true,
          status: "error"
        }) 
          setVisible(false);
          return setMessage("Error connecting to the game server please refresh...");
      }
      setVisible(false);
      socket.emit("gameJoinQueue");
  };

  return (
    <Stack spacing={{base: "40px", xl: "52px" }} align={"center"}>
        <MultiLobbyParty username={currentUser.username} ready={readyness} other={opponent.username} otherReady={opponent.ready} alone={party}/>
        {!shadow && <Image src='/Shadow.png' w={"341px"} h={"auto"}></Image>}
        <Button
          variant={"primary"}
          w={"217px"}
          h={"60px"}
          fontSize={"25px"}
          onClick={handleJoinQueue}
          isDisabled={ready}
        >Ready</Button>
    </Stack>
  )
}

export default LobbyParty
