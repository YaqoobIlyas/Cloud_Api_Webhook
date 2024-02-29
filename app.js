const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

//import routes
const webhookRoutes = require("./routes/webhookRoute");
const mediaRoutes = require("./routes/mediaRoute");
const messageRoutes = require("./routes/messageRoute");
//app
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//routes middleware
app.use("/webhook", webhookRoutes);
app.use("/api", mediaRoutes);
app.use("/message", messageRoutes);
//routes
// default route handler
app.use((req, res, next) => {
  // If no routes match, respond with 404 status code
  res
    .status(200)
    .json({ message: "Server is listinig But No Request is made Yet..:):)" });
});
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
