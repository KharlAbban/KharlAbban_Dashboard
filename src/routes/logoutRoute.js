const express = require('express');
const logoutRouter = express.Router();
const cookieParser = require("cookie-parser");
const logoutController = require("../controllers/logoutController");

logoutRouter.use(express.json());
logoutRouter.use(cookieParser());

logoutRouter.get("/", logoutController.signOutUser);

module.exports = logoutRouter;