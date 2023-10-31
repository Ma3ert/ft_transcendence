import Cookies from "js-cookie";
import { io } from "socket.io-client";

const socket = io("http://e1r8p2.1337.ma:3000/game", {
  transports: ["websocket"],
  auth: {
    token: "Bearer " + Cookies.get("jwt"),
  },
});

export default socket;
