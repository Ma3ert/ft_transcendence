import React from "react";
import ScrollableStack from "@/components/ScrollableStack";
import NavBar from "@/components/NavBar";
import { Icon } from "@chakra-ui/react";
import { FaMedal, FaTrophy } from "react-icons/fa";
import UserField from "@/components/UserField";
import PageBody from "@/components/PageBody";
import UserRankField from "./UserRankField";

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
          width={535}
          height={624}
          spacing="25px"
        ></ScrollableStack>,
        <ScrollableStack
          items={rank}
          width={535}
          height={624}
          spacing="25px"
        ></ScrollableStack>,
      ]}
    />
  );
};

export default Achievements;
