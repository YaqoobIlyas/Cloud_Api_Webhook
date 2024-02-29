const axios = require("axios");

exports.autoMessage = async (req, res) => {
  let body_param = req.body;
  let formattedResult;
  console.log(body_param);
  console.log("Message: ", body_param.message);

  try {
    const apiUrl = `http://tanzeemulmadaris.net/Home/ShowResult?RollNo=${body_param.message}`;
    const response = await axios.get(apiUrl);
    const resultData = response.data;

    // Extract individual scores from the response
    const scores = {
      P1: resultData.P1,
      P2: resultData.P2,
      P3: resultData.P3,
      P4: resultData.P4,
      P5: resultData.P5,
      P6: resultData.P6,
      PartFirst: resultData.PartFirst,
      MarksObtained: resultData.MarksObtained,
      Grade: resultData.Grade,
      ExamStatus: resultData.ExamStatus,
    };

    formattedResult = "";
    Object.keys(scores).forEach((key) => {
      formattedResult += `${key}: ${scores[key]}\n`;
    });
    console.log("Result: ", formattedResult);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
  res.json({
    reply: formattedResult,
  });
};
