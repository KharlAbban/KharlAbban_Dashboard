const express = require('express');
const loginRouter = express.Router();
const loginController = require("../controllers/loginController");

loginRouter.use(express.json());

loginRouter.get("/", loginController.showLoginPage);
loginRouter.post("/", loginController.loginUser);

module.exports = loginRouter;