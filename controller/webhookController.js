const axios = require("axios");

const token = process.env.TOKEN;
const mytoken = process.env.MYTOKEN;

exports.webhookVerification = async (req, res) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];

  if (mode && token) {
    if (mode === "subscribe" && token === mytoken) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send("Verification failed");
    }
  } else {
    res.status(400).send("Missing parameters");
  }
};

exports.webhookEndpoint = async (req, res) => {
  let body_param = req.body;

  console.log(JSON.stringify(body_param, null, 2));

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
        try {
          const apiUrl = `http://tanzeemulmadaris.net/Home/ShowResult?RollNo=${mesg_body}`;
          const response = await axios.get(apiUrl);
          const resultData = response.data;

          console.log("Result: ", resultData.Result);

          const fbResponse = await axios.post(
            `https://graph.facebook.com/v18.0/${phon_no_id}/messages?access_token=${token}`,
            {
              messaging_product: "whatsapp",
              to: from,
              text: {
                body: resultData.Result,
              },
            }
          );

          res.sendStatus(200);
        } catch (error) {
          console.error("Error:", error);

          res.status(500).send("Internal Server Error");
        }
        return;
      }
    }
  }

  res.sendStatus(403);
};
