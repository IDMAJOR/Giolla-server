const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/auth.route");
const http = require("http");
const initializeSocket = require("./socket.io/socket");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 9000;

//midleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    credentials: true,
  })
);

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to dataBase");
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/auth", authRoute);

app.get("/cookie", (req, res) => {
  res.cookie("new", "world", { maxAge: 60000 });
  res.status(200).send({ message: "This should send a cookie" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

initializeSocket(server);

DBConnection();
server.listen(PORT, () => {
  console.log("connecting...");
  console.log(`server running on port ${PORT}`);
});
