const express = require("express");
const {
  signUp,
  signIn,
  googleAuth,
  getCookies,
  setCookies,
} = require("../controllers/auth.controller");

const router = express.Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/google").post(googleAuth);
// router.route("/cookies").get(getCookies);
// router.get("/cookie", setCookies);

module.exports = router;
