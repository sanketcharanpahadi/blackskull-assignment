require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const chatRouter = require("./routes/chatRoute");
const path = require("path");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("unable to connect", error);
  });

app.use("/api/users", userRouter);
app.use("/api/chat", chatRouter);

// Deployment

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running.");
  });
}
// Deployment

app.use(notFound);
app.use(errorHandler);

module.exports = app;
