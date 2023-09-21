const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit ('chat message', msg);
  });
  console.log("a user connected");

});

server.listen(3060, () => {
  console.log("server running at http://localhost:3000");
});
