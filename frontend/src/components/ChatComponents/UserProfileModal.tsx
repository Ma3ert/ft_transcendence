import {
  HStack,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Box,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import IconButton from "../IconButton";
import { FaEllipsis } from "react-icons/fa6";
import ScrollableStack from "../ScrollableStack";
import UserProfileHeader from "./UserProfileHeader";
import { GoDash } from "react-icons/go";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/requestProcessor";
import { AxiosResponse } from "axios";
import { ReactNode, useEffect, useState } from "react";
import { set } from "zod";

interface UserProfileModalProps {
  user: User;
}

interface UserGameInfoProps {
  title: string;
  info: string;
}
const UserGameInfo: React.FC<UserGameInfoProps> = ({ title, info }) => {
  return (
    <Stack
      w="100px"
      borderRadius={"15px"}
      bg="#181D25"
      px={5}
      py={2}
      spacing={2}
      justifyContent={"center"}
      alignItems="center"
    >
      <Text fontFamily="visbyRound" color="#DC585B" fontSize="lg">
        {title}
      </Text>
      <Text fontFamily="visbyRound" color="#D9D9D9" fontSize="md">
        {info}
      </Text>
    </Stack>
  );
};

export const LargeGameInfo: React.FC<UserGameInfoProps> = ({ title, info }) => {
  return (
    <HStack
      minW="150px"
      borderRadius={"15px"}
      bg="#181D25"
      px={5}
      py={2}
      spacing={3}
      justifyContent={"start"}
      alignItems="center"
      fontFamily={"visbyRound"}
    >
      <Text fontFamily="visbyRound" color="#DC585B" fontSize="lg">
        {title}:
      </Text>
      <Text fontFamily="visbyRound" color="#d9d9d9" fontSize="md">
        {info}
      </Text>
    </HStack>
  );
};

interface GameFieldProps {
  firstUser: User;
  secondUser: User;
  firstScore: number;
  secondScore: number;
  won: boolean;
}

export const GameField: React.FC<GameFieldProps> = ({
  won,
  firstUser,
  secondUser,
  firstScore,
  secondScore,
}) => {
  return (
    <Stack
      w="100%"
      h="100%"
      borderRadius={"15px"}
      bg="#181D25"
      minH="65px"
      maxH={"70px"}
      _hover={{ bg: "#5B6171" }}
      px={5}
      py={2}
    >
      <HStack
        w="100%"
        justifyContent="center"
        alignItems="center"
        spacing={{ base: "10px", lg: "20px" }}
      >
        <Text fontFamily="visbyRound" color={won ? "#d9d9d9" : "#DC585B"}>
          {firstUser.username}
        </Text>
        <UserAvatar user={firstUser} />
        <HStack
          minW="100px"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          borderRadius={"15px"}
        >
          <Text
            fontFamily="visbyRound"
            color={won ? "#d9d9d9" : "#DC585B"}
            fontWeight={"bold"}
            fontSize="md"
          >
            {firstScore}
          </Text>
          <Icon as={GoDash} color="#D9D9D9" fontSize="md" />
          <Text
            fontFamily="visbyRound"
            color={!won ? "#d9d9d9" : "#DC585B"}
            fontWeight={"bold"}
            fontSize="md"
          >
            {secondScore}
          </Text>
        </HStack>
        <UserAvatar user={secondUser} />
        <Text fontFamily="visbyRound" color={!won ? "#d9d9d9" : "#DC585B"}>
          {secondUser.username}
        </Text>
      </HStack>
    </Stack>
  );
};

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user }) => {
  const client = new apiClient("/users/")
  const [userProfile, setUserProfile] = useState<any>(undefined)
  useEffect(() => {
    client.getData(user.id).then((res: AxiosResponse) => {
      console.log("res: ", res.data.member)
      setUserProfile(res.data.member);
    })
  }, [])
  if (userProfile === undefined)
    return null;
  console.log(userProfile.games)
  return (
    <Stack minH={"50vh"} w="100%" h="100%" spacing={4} p={4}>
      <Grid templateRows={"10vh 1fr"}>
        <GridItem>
          <UserProfileHeader user={userProfile.user} />
        </GridItem>
        <GridItem>
          <Grid templateColumns={"150px 1fr"}>
            <GridItem w="100%" h="100%">
              <Stack
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="start"
                spacing={3}
                >
                <UserGameInfo title="Games" info={userProfile.totalGames} />
                <UserGameInfo title="Wins" info={userProfile.numberOfWon} />
                <UserGameInfo title="Losses" info={userProfile.numberOfLost} />
              </Stack>
            </GridItem>
            <GridItem>
              <ScrollableStack yPadding={2} h="40vh">
                {
                  userProfile.games.toReversed().map((match: any) => {
                    return (
                        <GameField
                        firstUser={userProfile.user}
                        key={match.id}
                        secondUser={match.opponent}
                        firstScore={match.score}
                        secondScore={match.opponentScore}
                        won={match.won}
                        />
                      )
                    })
                }
              </ScrollableStack>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default UserProfileModal;
