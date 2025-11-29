const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("peer-joined", socket.id);
  });

  socket.on("offer", ({ offer, roomId }) => {
    socket.to(roomId).emit("offer", { offer, from: socket.id });
  });

  socket.on("answer", ({ answer, roomId }) => {
    socket.to(roomId).emit("answer", { answer, from: socket.id });
  });

  socket.on("ice-candidate", ({ candidate, roomId }) => {
    socket.to(roomId).emit("ice-candidate", { candidate, from: socket.id });
  });

  socket.on("disconnecting", () => {
    Array.from(socket.rooms)
      .filter(r => r !== socket.id)
      .forEach((roomId) => {
        socket.to(roomId).emit("peer-left", socket.id);
      });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("Signaling server running on http://localhost:5000"));
