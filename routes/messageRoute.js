const express = require("express");
const router = express.Router();

const { autoMessage } = require("../controller/messageController");

router.post("/", autoMessage);

module.exports = router;
