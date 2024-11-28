const initializeSocket = (server) => {
  const { Server } = require("socket.io");

  const io = new Server(server, {
    cors: {
      origin: "*", // Replace "*" with specific origins for production
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (data) => {
      console.log("Message received:", data);
      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
