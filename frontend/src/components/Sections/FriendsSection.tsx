/* eslint-disable react/jsx-key */
import { Stack } from "@chakra-ui/react"
import { AppNavigationContext } from "@/context/Contexts";
import { useContext } from "react";
import UserField from "../UserField";
import UserRequest from "../UserRequest";
import ScrollableStack from "../ScrollableStack";
interface FriendsSectionProps {}
const FriendsSection:React.FC<FriendsSectionProps>  = ({}) => {
    const { friendsSection } = useContext(AppNavigationContext);
    const requests=[
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        <UserRequest userPic='' userName='ma3ert'></UserRequest>,
        ]
    const friends=[
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        <UserField userPic='' userName='ma3ert'></UserField>,
        ]
  return (<Stack w='100%' h='100%' justify={'center'} alignItems={'center'}>
            {friendsSection === 'friends' ? <ScrollableStack items={requests} width={555} height={624} spacing='25px'/>:
              <ScrollableStack items={friends} width={555} height={624} spacing='25px'/>}
        </Stack>
    )
}

export default FriendsSection;