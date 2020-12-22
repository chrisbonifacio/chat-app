const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const users = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("send-nickname", (nickname) => {
    socket.nickname = nickname;
    io.emit("chat-message", `${socket.nickname} has entered the chat`);
  });

  if (socket.nickname)
    io.emit("chat-message", `${socket.nickname} has entered the chat`);

  socket.on("chat-message", (message) => {
    console.log({ message });
    io.emit("chat-message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("chat-message", `User has left the chat`);
  });
});

const PORT = process.env.PORT || 8000;

http.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
