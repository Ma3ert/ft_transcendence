/* eslint-disable react/jsx-key */
import React from "react";
import ScrollableStack from "@/components/ScrollableStack";
import NavBar from "@/components/NavBar";
import { Wrap, Stack, Text, HStack } from "@chakra-ui/react";
import PageBody from "@/components/PageBody";
import ProgressLevel from "@/components/ProgressLevel";
import LobbyParty from "@/components/LobbyParty";
import Challenge from "../Challenge";

type Props = {};

const LobbySection = (props: Props) => {
  const challenges = [
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
    <Challenge
      progress="5"
      base="10"
      description="challenge in progress"
    ></Challenge>,
  ];
  return (
  
    <HStack w='100%' h='100%' justifyContent={'space-around'} alignItems={'center'}>
      {/* <Stack spacing={"55px"} align={"start"}>
        <ProgressLevel></ProgressLevel>
        <Stack spacing={"20px"}>
          <Text fontFamily={"visbyRound"} color={"#5B6171"} fontSize={"25px"}>
            Challenges
          </Text>
          <ScrollableStack
            h="40vh">
              {challenges}
            </ScrollableStack>
        </Stack>
      </Stack> */}
      {/* <LobbyParty solo={true}></LobbyParty> */}
    </HStack>
  );
};

export default LobbySection;
