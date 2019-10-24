const io = require("socket.io")(3000);
let i = 0;
const users = {};
io.on("connection", socket => {
  //   socket.emit("chat-mssz", "Gahori");
  console.log(i);
  i++;
  socket.on("new-user", name => {
    console.log(name);
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-mssz-server", mssz => {
    socket.broadcast.emit("chat-mssz", { mssz: mssz, name: users[socket.id] });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", `${users[socket.id]} left`);
    delete users[socket.id];
  });
});
