const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const socketArray = [];
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

function closeAllSocketConnections() {
  socketArray.forEach((socket) => {
    socket.disconnect(true); // true: close the connection immediately
  });
}

io.on("connection", (socket) => {
  if (!socketArray.includes(socket.id)) {
    socketArray.push(socket.id);
    console.log("new user connected with socket id: " + socket.id);
  }
  socket.on("userLoggedIn", (msg) => {
    console.table("message: " + msg);
    io.emit(
      "checkNotification",
      `server message: user ${msg.socketid} has no notifcation yet`
    );
  });
  socket.on("userIsActive", (msg) => {
    console.table("message: " + msg);
    setTimeout(() => {
      io.emit ('directMessage', {
        from:4,
        to:msg.from,
        username: "7amid",
        game:true
      })
    }, 7000); 
    io.emit(
      "checkNotification",
      `server message: user ${msg.socketid} is active`
    );
  });

  socket.on("directMessage", (msg) => {
    if (msg.game) {
      io.emit("directMessage", {
        from: msg.from,
        to: msg.to,
        username: "cristiano ronaldo",
        message: msg.message,
        game: msg.game,
      });
      return;
    } else {
      io.emit("directMessage", {
        from: msg.from,
        to: msg.to,
        username: "cristiano ronaldo",
        message: msg.message,
      });
      setTimeout(() => {
        io.emit("directMessage", {
          from: msg.to,
          to: msg.from,
          username: "7amid",
          message: `this is message from cristiano ronaldo`,
        });
      }, 2000);
    }
  });

  socket.on ("readChatNotification", (msg) => {
    console.log (`all messages are read by ${msg.socketid}`)
    console.table (msg)
  }
  )
  socket.on ("channelMessage", (msg) => {
    console.log (`channel message in channel  ${msg.channelid}`)
    console.table (msg)
  }
  )
  socket.on("userIsNotActive", (msg) => {
    console.table("message: " + msg);
    io.emit(
      "checkNotification",
      `server message: user ${msg.socketid} is not active`
    );
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected with socket id: ${socket.id}`);
  });
  // console.log("a user connected");
});

server.listen(3060, () => {
  console.log("server running at http://localhost:3000");
  closeAllSocketConnections();
});
