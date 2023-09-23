const express = require('express');
const loginRouter = express.Router();
const loginController = require("../controllers/loginController");
const { requiresNoAuth } = require("../middleware/jwtFunctions");

loginRouter.use(requiresNoAuth);
loginRouter.use(express.json());

loginRouter.get("/", loginController.showLoginPage);
loginRouter.post("/", loginController.loginUser);

module.exports = loginRouter;