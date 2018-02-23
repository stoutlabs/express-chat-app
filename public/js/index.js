var socket = io();

socket.on("connect", () => {
  console.log("connected to server!");
});

socket.on("disconnect", () => {
  console.log("unable to connect to server...");
});

socket.on("newMessage", message => {
  console.log("new message:", message);
});
