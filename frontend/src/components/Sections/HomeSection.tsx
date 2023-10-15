import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "@/components/ChatComponents/Header";
import AppNavigationProvider from "@/providers/AppNavigationProvider";
import { useQuery } from "react-query";
import apiClient from "@/services/requestProcessor";
import { useContext, useEffect } from "react";
import { GlobalContext, UsersContext } from "@/context/Contexts";
import { NotifyServer } from "../../../utils/eventEmitter";
import Cookies from "js-cookie";
import io from "socket.io-client";
import GlobalLayout from "../Layouts/GlobalLayout";
import MainLayout from "../Layouts/MainLayout";
import LobbySection from "./LobbySection";

interface HomeSectionProps {
}

const HomeSection: React.FC<HomeSectionProps> = ({}) => {
  const { socket } = useContext(GlobalContext);
  const { loggedInUser, setChatNotifications, setInviteNotifications } =
    useContext(UsersContext);

  const { authenticated, setSocket } = useContext(GlobalContext);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      autoConnect: false,
      transports: ["websocket", "polling"],
      // closeOnBeforeunload: true,
      // reconnection: false,
    });

    const token = Cookies.get("jwt");
    socket.auth = { token: `Bearer ${token}` };
    console.log(`jwt token : ${token}`);
    socket.connect();
    setSocket!(socket);
    socket.on("connect", () => {
      console.log("client connected");
      NotifyServer(socket, "userLoggedIn", loggedInUser!);
      socket!.on("checkNotification", (message: checkNotification) => {
        setChatNotifications!(message.data.chat);
        setInviteNotifications!(message.data.invites);
        console.log("notifications");
        console.log(message);
      });
      socket.on("disconnect", () => {
        console.log("client disconnected");
      });
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <LobbySection />
  );
};
export default HomeSection;
