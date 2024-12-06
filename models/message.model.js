const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true, // Making sure text is required
    },
    sender: {
      type: String,
      enum: ["Admin", "User"], // Restricting sender to be either Admin or User
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageSchema = mongoose.model("Message", messageSchema);

module.exports = MessageSchema;
