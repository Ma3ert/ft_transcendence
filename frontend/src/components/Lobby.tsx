import React from 'react'
import ScrollableStack from '@/components/ScrollableStack';
import NavBar from '@/components/NavBar';
import { Wrap, Stack, Text, SimpleGrid, Grid, GridItem } from '@chakra-ui/react';
import PageBody from '@/components/PageBody';
import ProgressLevel from '@/components/ProgressLevel';
import LobbyParty from '@/components/LobbyParty';
import Challenge from './Challenge';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

type Props = {};

const Lobby = (props: Props) => {
  const {currentUser, updateUser} = useAuth();
  const router = useRouter()
  if (!currentUser || !currentUser.user.activated)
    router.push("/");
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
    <PageBody
    navBar = {<NavBar></NavBar>}
    tabs={[<Text fontSize={"15px"}>Lobby</Text>, <Text fontSize={"15px"}>Lobby</Text>]}
    bodys={[
    <Grid templateColumns={"repeat(2, 1fr)"}>
      <GridItem
        colSpan={{ base: 2, lg: 1 }}
      >
        <Stack spacing={"55px"} align={{base: "center", lg: "start" }}>
          <ProgressLevel></ProgressLevel>
          <Stack spacing={"20px"}>
            <Text fontFamily={"visbyRound"} color={"#5B6171"} fontSize={"25px"}>Stats</Text>
            <ScrollableStack>{challenges}</ScrollableStack>
          </Stack>
        </Stack>
      </GridItem>
      <GridItem
      colSpan={{ base: 2, lg: 1 }}
      >
        <LobbyParty username={currentUser!.username} ready={false} other={""} otherReady={false} alone={true}></LobbyParty>
      </GridItem>
    </Grid>,
    <Grid templateColumns={"repeat(2, 1fr)"}>
      <GridItem
        colSpan={{ base: 2, lg: 1 }}
      >
        <Stack spacing={"55px"} align={{base: "center", lg: "start" }}>
          <ProgressLevel></ProgressLevel>
          <Stack spacing={"20px"}>
            <Text fontFamily={"visbyRound"} color={"#5B6171"} fontSize={"25px"}>Stats</Text>
            <ScrollableStack
              width={435}
              height={344}
              spacing='28px'
              items={challenges}/>
          </Stack>
        </Stack>
      </GridItem>
      <GridItem
      colSpan={{ base: 2, lg: 1 }}
      >
      <LobbyParty solo={false}></LobbyParty>
      </GridItem>
    </Grid>
    ]}
  />
  )
}

export default Lobby;
