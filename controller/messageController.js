exports.autoMessage = async (req, res) => {
  let body_param = req.body;
  console.log(body_param);
  console.log("Message: ", body_param.message);

  res.json({
    reply: "Hi, we have received your request. Thanks for contacting.",
  });
};
