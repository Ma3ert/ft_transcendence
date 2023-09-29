"use client";
import HomeSection from "@/components/Sections/HomeSection";
import MainSection from "@/components/Sections/MainSection";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import LoginPage from "@/components/Sections/LoginPage";
import { GlobalContext } from "@/context/Contexts";
import UsersProvider from "@/providers/UsersProvider";
import { useEffect } from "react";
import io from "socket.io-client";

export default function Home() {
  const { authenticated, setSocket } = useContext(GlobalContext);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYmFiMGVkOS05YWIwLTQ0NzgtOTFiMC1hMDAyNzJjNzhiOGEiLCJ1c2VybmFtZSI6InllbGF0bWFuIiwiaWF0IjoxNjk1OTk5NTM2LCJleHAiOjE2OTY2MDQzMzZ9.hK3Hpp6Qd1EJVJ70kFellw9fkbMVBR0ckVLueJhM9S8";

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      autoConnect: false,
      transports: ["websocket", "polling"],
      // closeOnBeforeunload: true,
      // reconnection: false,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    socket.auth = { token: `Bearer ${token}` };
    socket.connect();
    setSocket!(socket);
    socket.on("connect", () => {
      console.log("client connected");
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
    <Box>
      {authenticated ? (
        <UsersProvider>
          <HomeSection>
            <MainSection />
          </HomeSection>
        </UsersProvider>
      ) : (
        <LoginPage />
      )}
    </Box>
  );
}
