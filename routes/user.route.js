const express = require("express");
const { getUserMessage } = require("../controllers/user.controllers");

const router = express.Router();

router.route("/get-message/:userId").get(getUserMessage);

module.exports = router;
