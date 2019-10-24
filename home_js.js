const join_btn = document.getElementById("login");
const input_name = document.getElementById("name");
const name;
join_btn.addEventListener("click", () => {
  name = input_name.value;
});
