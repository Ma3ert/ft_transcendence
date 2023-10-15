/* eslint-disable react/jsx-key */
import React from 'react'
import ScrollableStack from '@/components/ScrollableStack';
import NavBar from '@/components/NavBar';
import { Icon, } from '@chakra-ui/react';
import {FaMedal, FaTrophy} from "react-icons/fa"
import UserField from '@/components/UserField';
import PageBody from '@/components/PageBody';
import UserRankField from './UserRankField';

type Props = {};

const Achievements = (props: Props) => {
  const rank = [
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
    <UserRankField userPic="" userName="ma3ert"></UserRankField>,
  ];
  return (
    <PageBody
      navBar={<NavBar />}
      tabs={[
        <Icon as={FaMedal} style={{ fontSize: "23px" }} />,
        <Icon as={FaTrophy} style={{ fontSize: "23px" }} />,
      ]}
      bodys={[
        <ScrollableStack
          items={rank}
          width={{base: "235px", sm: "335px", md: "435px",  lg:"535px" }}
          height={{base: "224px", sm: "424px", md: "435px", lg: "624px"}}
          spacing= {{ base: "10px", md:"20px" }}
        ></ScrollableStack>,
        <ScrollableStack
          items={rank}
          width={{base: "235px", sm: "325px", md: "435px",  lg:"535px" }}
          height={{base: "224px", sm: "424px", md: "435px", lg: "624px"}}
          spacing= {{ base: "10px", md:"20px" }}
        ></ScrollableStack>,
      ]}
    />
  );
};

export default Achievements;
