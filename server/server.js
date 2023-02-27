const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});


io.on("connection", (socket) => {
    // notify existing users
    socket.broadcast.emit("user connected", {
      userID: socket.id,
      username: socket.username,
    });
  });

io.on("myMessage", (message) => {
    console.log(message)
})

httpServer.listen(8080, ()=>"server listeing 8080...")