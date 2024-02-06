const express = require("express");
const body_parser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const app = express().use(body_parser.json());

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;

app.get("/", (req, res) => {
  res.send("WebHook is working well!!!");
});
app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      res.status(200).send(challenge);
    } else {
      res.status(403);
    }
  }
});

app.post("/webhook", (req, res) => {
  let body_param = req.body;

  if (body_param.object && body_param.entry && body_param.entry.length > 0) {
    let entry = body_param.entry[0];

    if (entry.changes && entry.changes.length > 0) {
      let change = entry.changes[0];

      if (
        change.value &&
        change.value.messages &&
        change.value.messages.length > 0
      ) {
        let message = change.value.messages[0];

        let phon_no_id = change.value.metadata.phone_number_id;
        let from = message.from;
        let mesg_body = message.text.body;

        console.log("User sent this message:", mesg_body);

        // Add your axios call here

        res.sendStatus(200);
        return;
      }
    }
  }

  res.sendStatus(403);
});

app.listen(process.env.PORT, () => {
  console.log("Webhook is listening");
});
