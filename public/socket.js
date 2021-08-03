var port = 3000;
var host = "127.0.0.1";
var url = `http://${host}:${port}`;

// Make Socket Connection
var socket = io.connect(url);

var message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

// Emit Event
btn.addEventListener("click", (event) => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
  handle.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

// Listen Event
socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.handle} : </strong> ${data.message} </p>`;
});

socket.on("typing", (data) => {
  feedback.innerHTML = `<p><em> ${data} is typing a message...  </em></p>`;
});
