const express = require("express");
const {
  signUp,
  signIn,
  googleAuth,
  verifyUser,
} = require("../controllers/auth.controller");

const { verifiedUserToken } = require("../utils/verifiedUser");

const router = express.Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/google").post(googleAuth);
router.get("/verify-token", verifyUser);
// router.get("/cookie", setCookies);

module.exports = router;
