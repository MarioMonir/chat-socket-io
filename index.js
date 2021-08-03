var express = require("express");
const host = "127.0.0.1";
const port = 3000;
var socket = require("socket.io");

// App Setup
var app = express();
var server = app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});

/*=====================  Middle Ware ====================*/

// Serve Static Files
app.use(express.static("public"));

// Socket Setup
var io = socket(server);
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

/*========================================================*/
