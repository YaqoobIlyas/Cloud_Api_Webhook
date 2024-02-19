const express = require("express");
const router = express.Router();

const {
  uploadMedia,
  sendMediaMessage,
} = require("../controller/mediaController");

router.post("/uploadMedia/:id", uploadMedia);
router.post("/sendMediaMessage/:id", sendMediaMessage);


module.exports = router;
