'use client';
import { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import io from "socket.io-client";

export default function Home() {

    useEffect(() => {
        const token = '';
        const socket = io("http://localhost:3000", {
            // autoConnect: false,
            transports: ["websocket", "polling"],
            closeOnBeforeunload: true,
            // reconnection: false,
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            },
            });
        console.log("home page");
        socket.on("connect", () => {
            console.log("client connected");
            socket.on("disconnect", () => {
                console.log("client disconnected");
            });
        });
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }, []);
  return (
    <Box>
      <Heading>Home</Heading>
    </Box>
  );
}
