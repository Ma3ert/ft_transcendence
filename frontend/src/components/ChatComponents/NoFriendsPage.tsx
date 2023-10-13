import { HStack, Stack, Heading, Button, Text, Icon } from "@chakra-ui/react"
import { FaUserPlus } from "react-icons/fa"
import {useContext} from 'react'
import { AppNavigationContext } from "@/context/Contexts"

interface NoFriendsPageProps {}
const NoFriendsPage:React.FC<NoFriendsPageProps> = ({}) => {

    const {setCurrentSection} = useContext(AppNavigationContext)
    return (
        <Stack w='100%' h='100%' justifyContent='center' alignItems='center'>
           
           <Stack spacing={8}  justifyContent={'center'} alignItems='center'>
            <Heading size='md' color='#5B6171'>You have no friends at the moment</Heading>
            <Button  variant='largeSecondary'  onClick={()=>setCurrentSection! ('friends')}>
                <HStack spacing={4} alignItems={'center'}>
                <Text>Find friends</Text>
                <Icon as={FaUserPlus}  size='sm' />
                </HStack>
            </Button>
           </Stack>
        </Stack>
    )
    }

export default NoFriendsPage;