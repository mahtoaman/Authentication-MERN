const express = require("express");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

//=========================================================REGISTER==================================================
async function regiserUser(req, res) {
  const { email, password } = req.body;
  let data = { email, password };
  console.log(data);

  const hash = bcrypt.hashSync(password, 10);
  data["password"] = hash;

  let userModel = await userModel.create(data);

  res.status(200).send({ status: "ok" });
}

//================================================LOGIN========================================
async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    return res.status(404).send({ status: "error", message: "Invalid login" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    // console.log(token);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 259000000),
    });
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
}

//=====================================================GET USER=====================================
async function getUser(req, res) {
  try {
    // let token = req.headers.authorization;
    //  let token = fs.readFile('token', "utf8", (err, data) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log(data);
    //   });

    //   console.log(token)
    const token = req.cookies.token;
    if (!token)
      return res
        .status(400)
        .send({ status: false, msg: "token must be present" });
    token = req.headers.authorization.split(" ")[1];

    let decoded = jwt.verify(token, "secret123");
    console.log(decoded);

    const email = decoded.email;
    const user = await userModel.findOne({ email: email });

    return res.json({ status: "ok", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "invalid token" });
  }
}

module.exports = { regiserUser, login, getUser };
