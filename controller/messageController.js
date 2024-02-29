const axios = require("axios");

exports.autoMessage = async (req, res) => {
  let body_param = req.body;
  let formattedResult = ""; // Default value
  console.log(body_param);
  console.log("Message: ", body_param.message);
 res.json({
   reply: formattedResult,
 });
  
 
};
