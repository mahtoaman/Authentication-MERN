const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/register", async function regiserUser(req, res) {
  const { email, password } = req.body;
  let data = { email, password };

  const hash = bcrypt.hashSync(password, 10);
  data["password"] = hash;
  
  let user = await userModel.create(data);

  const payload = {
    id: user._id,
    email: email,
  };

  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, "shakalakaboomboom", options);
  console.log(token);

  res.cookie('token',token).send({ data: user });
});

app.listen(4000, () => console.log("server running on port 4000"));
