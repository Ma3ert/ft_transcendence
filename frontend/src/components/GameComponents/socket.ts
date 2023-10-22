import Cookies from "js-cookie";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/game", {
    transports: ["websocket"],
    auth: {
        token: "Bearer " + Cookies.get("jwt"),
    },
});

export default socket;