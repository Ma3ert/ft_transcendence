/* eslint-disable react/jsx-key */
"use client";

// import UserField from '@/components/UserField';

import PageLayout from '@/components/PageLayout';
import { ReactNode, useState } from 'react';
import Setting from '@/components/Setting';
import Lobby from '@/components/Lobby';
import Achievements from '@/components/Achievements';
import FriendSection from '@/components/FriendSection';



export default function Home() {
  const [bodyIndex, setBodyIndex] = useState(0);
  const bodys:ReactNode[] =  [<Lobby/>, <Achievements/>, <FriendSection/>, <Setting/>,];

  return (
   
    <PageLayout body={bodys[bodyIndex]} bodySetter={setBodyIndex}/>
    

  )
}
