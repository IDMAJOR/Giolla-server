const express = require("express");
const {
  signUp,
  signIn,
  googleAuth,
} = require("../controllers/auth.controller");

const router = express.Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/google").post(googleAuth);

module.exports = router;
