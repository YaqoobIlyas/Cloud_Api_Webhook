const axios = require("axios");

exports.autoMessage = async (req, res) => {
  let body_param = req.body;

  console.log(body_param);
  console.log("Message: ", body_param.message);
  try {
    const processedData = await processData(body_param.message);

    res.json({ reply: body_param.message });
  } catch (error) {
    res.json({ reply: "An error occurred while processing the request." });
  }
};

async function processData(rollno) {
  let formattedResult = "";
  try {
    const apiUrl = `http://tanzeemulmadaris.net/Home/ShowResult?RollNo=${rollno}`;
    const response = await axios.get(apiUrl);
    const resultData = response.data;

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

    Object.keys(scores).forEach((key) => {
      formattedResult += `${key}: ${scores[key]}\n`;
    });
    console.log("Result: ", formattedResult);
  } catch (error) {
    console.error("Error:", error);
  }

  return formattedResult;
}
