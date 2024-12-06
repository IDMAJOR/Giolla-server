const MessageSchema = require("../models/message.model");
const User = require("../models/user.model");

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

    socket.on("message", async (data, callback) => {
      console.log("Message received:", data);

      if (!data.message) {
        return callback({ error: "Message text is required." });
      }

      // Process the message...

      console.log(data.userId);

      const saveMessage = async () => {
        const { message, sender, userId } = data;

        try {
          // Make sure to await for the user lookup
          const isUser = await User.findById(userId);

          if (!isUser) {
            // Handle user not found error (respond with callback or message)
            return callback({ error: "User not found" });
          }

          // Save the message in the database
          const newMessage = await MessageSchema.create({
            message,
            sender,
            userId,
          });

          // Optionally emit the new message to all connected clients
          callback({ success: true });
          io.emit("message", newMessage);

          // You can send an acknowledgment or do something else here
        } catch (error) {
          console.log(error);
          // Pass the error to the callback
          callback({ error: error.message });
        }
      };

      saveMessage();
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
