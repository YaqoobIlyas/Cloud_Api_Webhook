const axios = require("axios");

exports.autoMessage = async (req, res) => {
  let body_param = req.body;

  console.log(body_param);
  console.log("Message: ", body_param.message);
  // Immediately respond to the client to acknowledge receipt of the request
  res.json({ reply: "Request received, will be processed shortly." });

  try {
    // Perform processing of the request body
    const processedData = await processData(body_param.message);

    // Once processing is complete, send the processed data back to the client
    res.json({ reply: processedData });
  } catch (error) {
    // If an error occurs during processing, send an error response to the client
    res.json({ reply: "An error occurred while processing the request." });
  }
};

async function processData(rollno) {
  let formattedResult = "";
  try {
    const apiUrl = `http://tanzeemulmadaris.net/Home/ShowResult?RollNo=${rollno}`;
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

    Object.keys(scores).forEach((key) => {
      formattedResult += `${key}: ${scores[key]}\n`;
    });
    console.log("Result: ", formattedResult);
  } catch (error) {
    console.error("Error:", error);
  }

  return formattedResult;
}
/*
 res.json({
    reply: formattedResult,
  });
 


*/
