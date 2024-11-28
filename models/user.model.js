const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
    },

    lastname: {
      type: String,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },
    profilePhoto: {
      type: String,
      default:
        "https://camarasal.com/wp-content/uploads/2020/08/default-image-5-1.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("GiollaUser", userSchema);

module.exports = User;
