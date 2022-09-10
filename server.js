require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/api/v1", routes);

const port = 3002;

const mongodbURL =
  "mongodb+srv://singhshrashti:1234567890@cluster0.fidgla6.mongodb.net/test";

mongoose.connect(mongodbURL, (error) => {
  if (!error) {
    console.log("Database conneted");
    app.listen(port, () => {
      console.log(`${port} is running...`);
    });
  }
});
