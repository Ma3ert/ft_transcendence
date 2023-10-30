import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "@/components/ChatComponents/Header";
import AppNavigationProvider from "@/providers/AppNavigationProvider";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/requestProcessor";
import { useContext, useEffect } from "react";
import { GlobalContext, UsersContext } from "@/context/Contexts";
import { NotifyServer } from "../../../utils/eventEmitter";
import Cookies from "js-cookie";
import io from "socket.io-client";
import GlobalLayout from "../Layouts/GlobalLayout";
import MainLayout from "../Layouts/MainLayout";
import LobbySection from "./LobbySection";

interface HomeSectionProps {}

const HomeSection: React.FC<HomeSectionProps> = ({}) => {
  const { socket } = useContext(GlobalContext);
  const { loggedInUser, setChatNotifications, setInviteNotifications } =
    useContext(UsersContext);

  const { authenticated, setSocket } = useContext(GlobalContext);

  return <LobbySection />;
};
export default HomeSection;
