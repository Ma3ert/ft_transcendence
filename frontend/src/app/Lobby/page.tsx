"use client";
import Challenge from '@/components/Challenge';
import ScrollableStack from '@/components/ScrollableStack';
import IconButton from '@/components/IconButton';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { TabList, Tabs, Tab, TabIndicator, Icon } from '@chakra-ui/react';
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
import PageLayout from '@/components/PageLayout';
import UserRequest from '@/components/UserRequest';
import ProgressLevel from '@/components/ProgressLevel';

export default function Home() {
  const items1=[
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
  const items2=[
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
  return (
    // <ProgressLevel></ProgressLevel>
    <PageLayout
      navBar={<NavBar/>}
      tabs={[<Icon as={BiSolidUser} style={{ fontSize: "23px" }}/>,
             <Icon as={BiSolidLockAlt} style={{ fontSize: "23px" }}/>]}
      bodys={[<UserSetting></UserSetting>, <PasswordSetting></PasswordSetting>, ]}
    />
    // <PageLayout
    //   navBar={<NavBar/>}
    //   tabs={[<Icon as={FaUserPlus} style={{ fontSize: "23px" }}/>, <Icon as={FaUserGroup} style={{ fontSize: "23px" }}/>]}
    //   bodys={[<ScrollableStack items={items1} width={555} height={624} spacing='25px'></ScrollableStack>,
    //           <ScrollableStack items={items2} width={555} height={624} spacing='25px'></ScrollableStack>]}
    // />
    // <PageLayout
    //   navBar={<NavBar/>}
    //   tabs={[<Icon as={FaMedal} style={{ fontSize: "23px" }}/>, <Icon as={FaTrophy} style={{ fontSize: "23px" }}/>]}
    //   bodys={[<ScrollableStack items={items1} width={535} height={624} spacing='25px'></ScrollableStack>,
    //           <ScrollableStack items={items1} width={535} height={624} spacing='25px'></ScrollableStack>]}
    // />
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
