const MessageSchema = require("../models/message.model");
const User = require("../models/user.model");

const getUserMessage = async (req, res) => {
  const { userId } = req.params; // Get userId from the request parameters
  console.log("User ID:", userId);

  try {
    const user = await User.findById(userId); // Find the user in the database

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.isAdmin) {
      // If the user is an admin, return all messages
      const userMessages = await MessageSchema.find();
      return res.status(200).json(userMessages);
    } else {
      // If the user is not an admin, return only messages for this user
      const userMessages = await MessageSchema.find({ userId: user._id });
      return res.status(200).json(userMessages);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { getUserMessage };
