const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    if (
      !firstname ||
      !email ||
      !password ||
      firstname === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(404, "Incorrect Password"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("user_token", token, {
        httpOnly: true,
      })
      .json(rest);

    // console.log("user_token", token);
  } catch (error) {
    next(error);
  }
};

const googleAuth = async (req, res, next) => {
  const { firstname, lastname, email, googlePhotoUrl } = req.body;

  console.log(firstname, lastname, email, googlePhotoUrl);

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("user_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
      const newUser = User.create({
        firstname:
          firstname.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePhoto: googlePhotoUrl,
      });

      const token = jwt.sign(
        { id: user._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("user_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const setCookies = async (req, res) => {
  res.cookie("authToken", "12345", {
    httpOnly: true, // Prevents access from JavaScript
    secure: true, // Only set cookie over HTTPS
    sameSite: "None", // For cross-site cookies
    expires: new Date(Date.now() + 3600000), // 1 hour expiry
  });
  res.status(200).send({ message: "This should send a cookie" });
};

const getCookies = async (req, res) => {
  console.log(req.headers.cookie);
};

module.exports = { signUp, signIn, googleAuth, setCookies, getCookies };
