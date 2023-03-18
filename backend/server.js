const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const route = require("./routes/route");

const app = express();
app.use(express.json());

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://amanmahto:anuragf45@amanscluster.os0m9fw.mongodb.net/MernAuth?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });

app.use("/", route);

app.listen(4000, () => console.log("server running on port 4000"));
