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
      bodys={[<ScrollableStack items={requests} width={555} height={624} spacing='25px'></ScrollableStack>,
              <ScrollableStack items={friends} width={555} height={624} spacing='25px'></ScrollableStack>]}
  />
  )
}

export default FriendSection