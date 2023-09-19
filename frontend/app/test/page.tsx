/* eslint-disable react/jsx-key */
"use client";

// import UserField from '@/components/UserField';

import PageLayout from '@/components/PageLayout';
import { ReactNode, useContext, useState } from 'react';
import Setting from '@/components/Setting';
import Lobby from '@/components/Lobby';
import Achievements from '@/components/Achievements';
import FriendSection from '@/components/FriendSection';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from '@/components/ChatComponents/Header';
import ChatBox from '@/components/ChatComponents/chatBox';
import { friendsList,  Channels } from '../../contstants';
import ChatNavigation from '@/components/ChatComponents/ChatNavigation';
import ChannelSettings from '@/components/ChatComponents/ChannelSettings';
import AppNavigationProvider from '@/providers/AppNavigationProvider';
import { AppNavigationContext } from '@/context/Contexts';
import Chat from '@/components/ChatComponents/Chat';
import SideBar from '@/components/SideBar';
export default function Home() {

  const {getCurrentSectionType, setCurrentSection, sections} = useContext(AppNavigationContext)
  return (
   <Grid templateColumns={{sm:"8vw 1fr", lg:"10vw 1fr", xl:'15vw 1fr', vl:'20vw 1fr'}} w="100%" h="100%">
    <GridItem border='1px' borderColor='red' >
      <SideBar currentSection={(getCurrentSectionType && getCurrentSectionType ()) || "home"} sectionSetter={setCurrentSection!} />
    </GridItem>
    <GridItem border='1px' borderColor='green' w="100%" h="100%" justifyContent={'center'} alignItems='center'>
    {getCurrentSectionType ? sections.get(getCurrentSectionType()) : sections.get('home')}
    </GridItem>
   </Grid>
  )
}
