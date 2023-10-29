import { Stack, Text, HStack, Icon } from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import { useAuth } from "@/hooks/useAuth";
import { GameField, LargeGameInfo } from "./UserProfileModal";
import { AiOutlineHistory } from "react-icons/ai";
import { ReactNode } from "react";

interface Props {}
const GameHistory: React.FC<Props> = ({}) => {
  const { currentUser } = useAuth();
  const chihaja = [];
  return (
    <Stack
      w="100%"
      h="100%"
      justifyContent={"center"}
      alignItems={"center"}
      spacing={5}
    >
      <HStack spacing={3} justifyContent={"center"} alignItems={"center"}>
        <Icon as={AiOutlineHistory} fontSize="md" color={"#5B6171"} />
        <Text fontFamily="visbyRound" fontSize={"md"} color={"#5B6171"}>
          Your game history
        </Text>
      </HStack>
      <HStack>
        <LargeGameInfo title="Wins" info={currentUser.numberOfLost} />
        <LargeGameInfo title="Losses" info={currentUser.numberOfWon} />
        <LargeGameInfo title="Total Games" info={currentUser.totalGames} />
      </HStack>
      <ScrollableStack h="50vh" yPadding={2}>
        {currentUser.games.toReversed().map((match: any) => {
          return (
            <GameField
              firstUser={currentUser.user}
              key={match.id}
              secondUser={match.opponent}
              firstScore={match.score}
              secondScore={match.opponentScore}
              won={match.won}
            />
          );
        })}
      </ScrollableStack>
    </Stack>
  );
};

export default GameHistory;
