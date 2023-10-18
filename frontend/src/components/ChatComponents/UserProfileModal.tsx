import { HStack, Heading, Stack, Text, Button, Image,Box, Grid, GridItem, Icon } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import IconButton from "../IconButton";
import { FaEllipsis } from "react-icons/fa6";
import ScrollableStack from "../ScrollableStack";
import UserProfileHeader from "./UserProfileHeader";
import { GoDash } from "react-icons/go";
import { useAuth } from "@/hooks/useAuth";

interface UserProfileModalProps {
  user: User;
}

interface UserGameInfoProps {
  title: string;
  info: string;
}
const UserGameInfo:React.FC<UserGameInfoProps> = ({title, info}) =>{
  return (
     <Stack w='100px' borderRadius={'15px'} bg='#181D25'  px={5} py={2} spacing={2}
     justifyContent={'center'} alignItems='center'>
      <Text color='#DC585B' fontSize='lg'>{title}</Text>
      <Text color='#D9D9D9' fontSize='md'>{info}</Text>
    </Stack>
  )
}

export const LargeGameInfo:React.FC<UserGameInfoProps> = ({title, info}) =>{
  return (
     <HStack minW='150px' borderRadius={'15px'} bg='#181D25'  px={5} py={2} spacing={3}
     justifyContent={'start'} alignItems='center'>
      <Text color='#DC585B' fontSize='lg'>{title}:</Text>
      <Text color='#5B6171' fontSize='md'>{info}</Text>
    </HStack>
  )
}

interface GameFieldProps {
  firstUser: User;
  secondUser:User 
  firstScore: number;
  secondScore: number;
}
export const GameField:React.FC<GameFieldProps> = ({firstUser, secondUser, firstScore, secondScore}) => {
  return (
    <Stack w='100%' h='100%' borderRadius={'15px'} bg='#181D25' minH='50px' maxH={'70px'} _hover={{bg:'#5B6171'}}  px={5} py={2} >
      <HStack w='100%' justifyContent='center' alignItems='center'>
        <UserAvatar user={firstUser} />
        <HStack minW='100px'  spacing={3} justifyContent='center' alignItems='center' borderRadius={'15px'}>
          <Text color='#DC585B' fontWeight={'bold'} fontSize='md'>{firstScore}</Text>
          <Icon as={GoDash} color='#D9D9D9' fontSize='md'/>
          <Text color='#DC585B' fontWeight={'bold'} fontSize='md'>{secondScore}</Text>
        </HStack>
        <UserAvatar user={secondUser}/>
      </HStack>
    </Stack>
  )
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user }) => {

  const {currentUser} = useAuth();
  return (
    <Stack minH={'50vh'}  w="100%" h="100%" spacing={4} p={4}>
      <Grid templateRows={"10vh 1fr"}>
        <GridItem>
            <UserProfileHeader user={user} />
        </GridItem>
        <GridItem >
          <Grid templateColumns={"150px 1fr"}>
            <GridItem w='100%' h='100%'>
             <Stack w='100%' h='100%' justifyContent='center' alignItems='start' spacing={3}>
              <UserGameInfo title='Games' info='123' />
              <UserGameInfo title='Wins' info='111' />
              <UserGameInfo title='Losses' info='13' />
             </Stack>
            </GridItem>
            <GridItem >
              <ScrollableStack yPadding={2} h="40vh">
              <GameField firstUser={currentUser!} secondUser={user} firstScore={1} secondScore={2}/>
              <GameField firstUser={currentUser!} secondUser={user} firstScore={1} secondScore={2}/>
              <GameField firstUser={currentUser!} secondUser={user} firstScore={1} secondScore={2}/>
              </ScrollableStack>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Stack>
  );
};


export default UserProfileModal;