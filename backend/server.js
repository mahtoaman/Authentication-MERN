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
//=========================================================REGISTER==================================================
app.post("/register", async function regiserUser(req, res) {
  const { email, password } = req.body;
  let data = { email, password };
  console.log(data);

  const hash = bcrypt.hashSync(password, 10);
  data["password"] = hash;

  let user = await userModel.create(data);

  res.send({ status: "ok" });
});

//============================================================LOGIN===================================================
app.post("/login", async (req, res) => {
  console.log('redirected to login backend')
  const user = await userModel.findOne({
    email: req.body.email,
  });
console.log("user not found")
  if (!user) {
    return res.send({ status: "error", error: "Invalid login" })
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    console.log(token);

    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

//====================================================DASHBOARD======================================================
app.get("/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];
  console.log(token)

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await userModel.findOne({ email: email });

    return res.json({ status: "ok", dashboard: user.dashboard });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.post("/dashboard", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    await userModel.updateOne(
      { email: email },
      { $set: { dashboard: req.body.dashboard } }
    );

    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

app.listen(4000, () => console.log("server running on port 4000"));
