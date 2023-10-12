"use client";
import HomeSection from "@/components/Sections/HomeSection";
import MainSection from "@/components/Sections/MainSection";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import LoginPage from "@/components/Sections/LoginPage";
import { GlobalContext } from "@/context/Contexts";
import UsersProvider from "@/providers/UsersProvider";
import ChatProvider from "@/providers/ChatProvider";
import { useEffect } from "react";
import io from "socket.io-client";
import ChannelsProvider from "@/providers/ChannelsProvider";
import Cookies from "js-cookie";

export default function Home() {
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
    // console.log (`jwt token : ${token}`)
    socket.connect();
    setSocket!(socket);
    socket.on("connect", () => {
      // console.log("client connected");
      socket.on("disconnect", () => {
        // console.log("client disconnected");
      });
    });

    socket.on("connect_error", (err) => {
      // console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Box>
      {authenticated ? (
        <UsersProvider>
          <ChatProvider>
            <ChannelsProvider>
              <HomeSection>
                <MainSection />
              </HomeSection>
            </ChannelsProvider>
          </ChatProvider>
        </UsersProvider>
      ) : (
        <LoginPage />
      )}
    </Box>
  );
}
