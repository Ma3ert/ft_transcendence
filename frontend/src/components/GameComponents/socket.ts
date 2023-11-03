import Cookies from "js-cookie";
import { Socket, io } from "socket.io-client";

let socket: Socket | undefined = undefined;

if (Cookies.get("jwt"))
{
    socket = io("http://e1r8p2.1337.ma:3000/game", {
    transports: ["websocket"],
    auth: {
      token: "Bearer " + Cookies.get("jwt"),
    },
  });
}


socket && socket.on("connect", () => {
  console.log("Connection is successfull");
})


socket && socket.on("connect_error", (err) => {
  console.log(err);
  Cookies.remove("jwt");
});

export default socket;
