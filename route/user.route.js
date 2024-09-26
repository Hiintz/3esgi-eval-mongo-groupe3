const express = require("express");
const router = express.Router();
const authController = require("./../controller/user.controller");

router.post("/login", userController.login);

router.post("/signin", userController.signin);

module.exports = router;
