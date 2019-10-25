const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
let j = 0;
const users = {};

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const rooms = {};
app.get("/", (req, res) => {
  res.render("index", { rooms: rooms });
});
app.post("/room", (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect("/");
  }
  rooms[req.body.room] = { users: {} };
  res.redirect(req.body.room);
  io.emit("room-created", req.body.room);
});
app.get("/:room", (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect("/");
  }
  res.render("room", { roomName: req.params.room });
});

server.listen(3000);

io.on("connection", socket => {
  //   socket.emit("chat-mssz", "Gahori");
  console.log(j);
  j++;
  socket.on("new-user", (name, roomName) => {
    socket.join(roomName);
    console.log(name);
    rooms[roomName].users[socket.id] = name;
    socket.to(roomName).broadcast.emit("user-connected", name);
  });
  socket.on("send-mssz-server", (mssz, roomName) => {
    socket.to(roomName).broadcast.emit("chat-mssz", {
      mssz: mssz,
      name: rooms[roomName].users[socket.id]
    });
  });
  // socket.on("disconnect", () => {
  //   socket.broadcast.emit("user-disconnected", `${users[socket.id]} left`);
  //   delete users[socket.id];
  // });
});
