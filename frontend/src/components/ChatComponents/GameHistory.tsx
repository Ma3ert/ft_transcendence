import { Stack, Text, HStack, Icon } from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import { useAuth } from "@/hooks/useAuth";
import { GameField, LargeGameInfo } from "./UserProfileModal";
import { AiOutlineHistory } from "react-icons/ai";

interface Props {}
const GameHistory: React.FC<Props> = ({}) => {
  const { currentUser } = useAuth();
  return (
    <Stack w='100%' h='100%' justifyContent={'center'} alignItems={'center'} spacing={5}>
       <HStack spacing={3} justifyContent={"center"}
      alignItems={"center"}>
        <Icon as={AiOutlineHistory} fontSize="md" color={"#5B6171"} />
        <Text fontSize={"md"} color={"#5B6171"}>
          Your game history
        </Text>
      </HStack>
      <HStack>
        <LargeGameInfo title="Wins" info="16" />
        <LargeGameInfo title="Losses" info="15" />
        <LargeGameInfo title="Total Games" info="100" />
      </HStack>
      <ScrollableStack h="50vh" yPadding={2}>
        <GameField
          firstUser={currentUser!}
          secondUser={currentUser!}
          firstScore={1}
          secondScore={2}
        />
        <GameField
          firstUser={currentUser!}
          secondUser={currentUser!}
          firstScore={1}
          secondScore={2}
        />
        <GameField
          firstUser={currentUser!}
          secondUser={currentUser!}
          firstScore={1}
          secondScore={2}
        />
      </ScrollableStack>
    </Stack>
  );
};

export default GameHistory;