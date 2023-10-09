import React from 'react'
import ScrollableStack from '@/components/ScrollableStack';
import NavBar from '@/components/NavBar';
import { TabList, Tabs, Tab, TabIndicator, Icon, Wrap, Stack, Text } from '@chakra-ui/react';
import {FaUserGroup, FaUserPlus} from "react-icons/fa6"
import PageBody from '@/components/PageBody';
import UserRequest from './UserRequest';
import UserField from './UserField';
import Challenge from './Challenge';

type Props = {}

const FriendSection = (props: Props) => {
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
  return (
    <PageBody
      navBar={<NavBar/>}
      tabs={[<Icon as={FaUserPlus} style={{ fontSize: "23px" }}/>, <Icon as={FaUserGroup} style={{ fontSize: "23px" }}/>]}
      bodys={[
      <ScrollableStack 
        items={requests} 
        width={{base: "235px", sm: "335px", md: "435px",  lg:"535px" }}
        height={{base: "224px", sm: "424px", md: "425px", lg: "624px"}} 
        spacing= {{ base: "5px", md:"8px", lg: "10px", xl: "12px" }}
        ></ScrollableStack>,
      <ScrollableStack 
        items={friends} 
        width={{base: "235px", sm: "335px", md: "435px",  lg:"535px" }} 
        height={{base: "224px", sm: "424px", md: "425px", lg: "624px"}} 
        spacing= {{ base: "5px", md:"8px", lg: "10px", xl: "12px" }}
        ></ScrollableStack>]}
  />
  )
}

export default FriendSection