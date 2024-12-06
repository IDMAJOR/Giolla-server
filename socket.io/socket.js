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

    socket.on("message", (data, callback) => {
      console.log("Message received:", data);

      if (!data.text) {
        return callback({ error: "Message text is required." });
      }
      // Process the message...
      callback({ success: true });

      console.log(data.userId);
      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
