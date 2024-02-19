const express = require("express");
const router = express.Router();

const {
  webhookVerification,
  webhookEndpoint,
} = require("../controller/webhookController");

router.get("/", webhookVerification);
router.post("/", webhookEndpoint);

module.exports = router;
