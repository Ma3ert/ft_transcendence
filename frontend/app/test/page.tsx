/* eslint-disable react/jsx-key */
"use client";

// import UserField from '@/components/UserField';

import PageLayout from "@/components/PageLayout";
import { ReactNode, useContext, useState } from "react";
import Setting from "@/components/Setting";
import Lobby from "@/components/Lobby";
import Achievements from "@/components/Achievements";
import FriendSection from "@/components/FriendSection";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "@/components/ChatComponents/Header";
import ChatBox from "@/components/ChatComponents/chatBox";
import { friendsList, Channels } from "../../contstants";
import ChatNavigation from "@/components/ChatComponents/ChatNavigation";
import ChannelSettings from "@/components/ChatComponents/ChannelSettings";
import AppNavigationProvider from "@/providers/AppNavigationProvider";
import { AppNavigationContext } from "@/context/Contexts";
import Chat from "@/components/Sections/ChatSection";
import SideBar from "@/components/SideBar";
import TabsWrapper from "@/components/Wrappers/tabsWrapper";
export default function Home() {
  const { getCurrentSectionType, setCurrentSection, sections } =
    useContext(AppNavigationContext);
  return (
    <Grid
      templateColumns={"8vw 1fr"}
      w="100%"
      h="100%"
      border="1px"
      borderColor="blue"
    >
      <GridItem w="100%" h="100%" border="1px" borderColor="yellow">
        <SideBar
          currentSection={
            (getCurrentSectionType && getCurrentSectionType()) || "lobby"
          }
          sectionSetter={setCurrentSection!}
        />
      </GridItem>
      <GridItem
        w="100%"
        h="100%"
        border="1px"
        borderColor="red"
        justifyContent={"center"}
        alignItems="center"
      >
        <Grid templateRows={"10vh 75vh"} w="100%" h="100%">
          <GridItem>
            <TabsWrapper />
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            justifyContent={"center"}
            alignItems="center"
          >
            {getCurrentSectionType
              ? sections?.get(getCurrentSectionType())
              : sections?.get("lobby")}
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}
