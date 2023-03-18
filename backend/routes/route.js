const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const listController = require("../controllers/listController");

//==============================USER APIS======================================

router.post("/register", userController.regiserUser);
router.post("/login", userController.login);
router.get("/user", userController.getUser);


module.exports = router;
