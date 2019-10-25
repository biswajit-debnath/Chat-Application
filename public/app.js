const socket = io("http://localhost:3000");
const mszz_Form = document.querySelector("#input-container");
const mszz_input = document.getElementById("input");
const mssz_container = document.getElementById("mssz-container");
const room_container = document.getElementById("room_container");

const name = prompt("Hey What's your name");
if (mszz_Form != null) {
  add_mszz(`You joined`, "_you");
  socket.emit("new-user", name, roomName);

  mszz_Form.addEventListener("submit", ev => {
    ev.preventDefault();
    const mszz = mszz_input.value;
    socket.emit("send-mssz-server", mszz, roomName);
    add_mszz(`You: ${mszz}`, "_you");
    mszz_input.value = " ";
  });
}

socket.on("room-created", room => {
  const roomDiv = document.createElement("div");
  const roomLink = document.createElement("a");
  roomDiv.innerText = room;
  roomLink.href = `/${room}`;
  roomLink.innerText = "join";
  room_container.appendChild(roomDiv);
  room_container.appendChild(roomLink);
});
socket.on("chat-mssz", data => {
  add_mszz(`${data.name}: ${data.mssz}`, "_other");
});
socket.on("user-connected", name => {
  add_mszz(`${name} joined`, "_other");
});
socket.on("user-disconnected", data => {
  add_mszz(data, "_other");
});

function add_mszz(data, user) {
  mszz_div = document.createElement("div");
  mszz_div.innerText = data;
  mszz_div.className = `mszz_div_cls${user}`;
  mssz_container.appendChild(mszz_div);
}
