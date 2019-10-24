const socket = io("http://localhost:3000");
const mszz_Form = document.querySelector("#input-container");
const mszz_input = document.getElementById("input");
const mssz_container = document.getElementById("mssz-container");

const name = prompt("Hey What's your name");
add_mszz(`You joined`);
socket.emit("new-user", name);

socket.on("chat-mssz", data => {
  add_mszz(`${data.name}: ${data.mssz}`);
});
socket.on("user-connected", name => {
  add_mszz(`${name} joined`);
});
socket.on("user-disconnected", data => {
  add_mszz(data);
});
mszz_Form.addEventListener("submit", ev => {
  ev.preventDefault();
  const mszz = mszz_input.value;
  socket.emit("send-mssz-server", mszz);
  add_mszz(`You: ${mszz}`);
  mszz_input.value = " ";
});

function add_mszz(data) {
  mszz_div = document.createElement("div");
  mszz_div.innerText = data;
  mszz_div.className = "mszz_div_cls";
  mssz_container.appendChild(mszz_div);
}
