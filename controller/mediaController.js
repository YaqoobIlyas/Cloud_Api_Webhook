const multer = require("multer");
const request = require("request");
const fs = require("fs");
const { validateMediaSize, mediaLimits } = require("../helper/validations");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination directory where files will be stored
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Set the file name to be the original file name
    cb(null, file.originalname);
  },
});

// Initialize multer middleware with the storage configuration
const upload = multer({ storage: storage }).single("file");

exports.uploadMedia = async (req, res) => {
  // Use multer middleware to handle file upload
  upload(req, res, function (err) {
    if (err) {
      // If an error occurs during file upload, return an error response
      return res.status(400).json({
        error: "Media could not be uploaded",
      });
    }

    // Check if file is missing
    if (!req.file) {
      return res.status(400).json({
        error: "Media File is required",
      });
    }

    // Read the file path and create a read stream
    const fileReadStream = fs.createReadStream(req.file.path);

    // Set up formData for the request
    const formData = {
      file: {
        value: fileReadStream,
        options: {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        },
      },
      type: req.file.mimetype,
      messaging_product: process.env.MESSAGING_PRODUCT,
    };

    // Set up request options
    const requestOptions = {
      url: `https://graph.facebook.com/v19.0/${req.params.id}/media`,
      formData: formData,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
        "content-type": "multipart/form-data",
      },
    };

    // Send the POST request
    request.post(requestOptions, function (err, resp, body) {
      if (err) {
        console.log("Error!", err);
        return res.status(500).json({
          error: "Internal server error",
        });
      } else {
        res.json(JSON.parse(body));
      }
    });
  });
};

exports.sendMediaMessage = async (req, res) => {
  const { id, to, type } = req.body;
  if (!id || !to || !type) {
    return res.status(400).json({
      error: "Required Fields: to, type and id",
    });
  }
  request.post(
    {
      url: `https://graph.facebook.com/v19.0/${req.params.id}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.META_AUTH_TOKEN}`,
        "content-type": "application/json",
      },
      body: `{
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": "${to}",
        "type": "${type}",
        "${type}": {
          "id": "${id}",
        },
      }`,
    },
    function (err, resp, body) {
      if (err) {
        console.log("Error!");
      } else {
        res.json(JSON.parse(body));
      }
    }
  );
};


