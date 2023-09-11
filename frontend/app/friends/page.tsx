"use client";
import Challenge from '@/components/Challenge';
import ScrollableStack from '@/components/ScrollableStack';
import IconButton from '@/components/IconButton';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { TabList, Tabs, Tab, TabIndicator, Icon, Wrap, Stack, Text } from '@chakra-ui/react';
// import UserField from '@/components/UserField';
import UserRankField from '@/components/UserRankField';
import {FaMedal, FaTrophy} from "react-icons/fa"
import {BiSolidLockAlt, BiSolidUser} from "react-icons/bi"
import {FaUserGroup, FaUserPlus} from "react-icons/fa6"
import {IoMdSettings} from "react-icons/io"
import UserField from '@/components/UserField';
import InviteToChannel from '@/components/InviteToChannel';
import UserCheck from '@/components/UserCheck';
import AddToChannel from '@/components/AddToChannel';
import CreateChannel from '@/components/CreateChannel';
import UserSetting from '@/components/UserSetting';
import PasswordSetting from '@/components/PasswordSetting';
import PageBody from '@/components/PageBody';
import UserRequest from '@/components/UserRequest';
import ProgressLevel from '@/components/ProgressLevel';
import SoloLobbyParty from '@/components/SoloLobbyParty';
import MultiLobbyParty from '@/components/MultiLobbyParty';
import LobbyParty from '@/components/LobbyParty';
import PageLayout from '@/components/PageLayout';
import { ReactNode, useState } from 'react';
import Setting from '@/components/Setting';
import Lobby from '@/components/Lobby';
import Achievements from '@/components/Achievements';
import FriendSection from '@/components/FriendSection';



export default function Home() {
  // const [bodyIndex, setBodyIndex] = useState(0);

  // const bodys:ReactNode[] =  [<Lobby/>, <Achievements/>, <FriendSection/>, <Setting/>,];

  return (
      <Stack  justify={'center'} alignItems={'center'} w='100%' h='100%'>
        <Lobby />
      </Stack>
    // <PageLayout body={bodys[bodyIndex]} bodySetter={setBodyIndex}/>
    
    // <ProgressLevel></ProgressLevel>
    // <SoloLobbyParty></SoloLobbyParty>
    // <MultiLobbyParty></MultiLobbyParty>
    
    
    // <NavBar></NavBar>
    // <SideBar></SideBar>
    // <Tabs w={"255px"} h={"50px"} isFitted variant={"default"}>
    //   <TabList>
    //     <Tab> <Icon as={FaMedal} style={{ fontSize: "20px" }}/> </Tab>
    //     <Tab> <Icon as={FaUserGroup} style={{ fontSize: "20px" }}/> </Tab>
    //     <Tab> <Icon as={IoMdSettings} style={{ fontSize: "20px" }}/> </Tab>
    //   </TabList>
    // </Tabs>
    // <AddToChannel users={items}/>
    // <CreateChannel/>
    // <UserSetting></UserSetting>
    // <PasswordSetting></PasswordSetting>
    // <UserRankField userName='ma3ert' userPic=''></UserRankField>
  )
}
