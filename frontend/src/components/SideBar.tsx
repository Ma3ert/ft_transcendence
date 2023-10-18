"use client";
import React, { useContext } from "react";
import { Stack } from "@chakra-ui/react";
import IconButton from "./IconButton";
import { AiFillHome } from "react-icons/ai";
import { BiSolidBell } from "react-icons/bi";
import { FaMedal } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import {IoStatsChart} from "react-icons/io5";
import Link from "next/link";
import { ChatContext, UsersContext } from "@/context/Contexts";

import {NotificationWrapper} from './ChatComponents/NotificationBadge'
interface Props {
}

const SideBar: React.FC<Props> = ({ }) => {
  const size = "25px";
  const links = new Map<Section, React.ElementType>();
  const routes = new Map<string, string>()
  const {inviteNotifications} = useContext(UsersContext)

  links.set("lobby", AiFillHome);
  links.set("stats", IoStatsChart);
  links.set("achievements", FaMedal);
  links.set("friends", FaUserGroup);
  links.set("settings", IoMdSettings);
  routes.set("lobby", "/Lobby");
  routes.set("stats", "/Stats");
  routes.set("achievements", "/Achievements");
  routes.set("friends", "/Friends");
  routes.set("settings", "/Settings");

  return (
    <Stack
      spacing={{ sm: 8, md: 10, lg: 12, xl: 14 }}
      w="100%"
      h="100%"
      justifyContent="center"
      alignItems="center"
    >
      {Array.from(links).map(([section, icon]) => {
        if (section == "friends") {
          return (
           <Link key={section} href={routes.get (section)!}>
             <NotificationWrapper  type='activeChat' status={inviteNotifications!}>
              <IconButton
                icon={icon}
                size={size}
                // currentSection === section ? "#DC585B" :
 />
            </NotificationWrapper>
           </Link>
          );
        }
        return (
        <Link key={section} href={routes.get (section)!}>
          <IconButton
          // currentSection === section ? "#DC585B" :
          // currentSection === section ? "35px" : 
            icon={icon}
            size={size}
          />
        </Link>
        );
      })}
    </Stack>
  );
};

export default SideBar;
