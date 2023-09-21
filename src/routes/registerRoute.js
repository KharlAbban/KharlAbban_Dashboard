const cookieParser = require("cookie-parser");
const express = require("express");
const registerRouter = express.Router();
// Import Controller Functions
const registerController = require("../controllers/registerController");

registerRouter.use(express.json());
registerRouter.use(cookieParser());

registerRouter.get("/", registerController.showRegisterPage);
registerRouter.post("/", registerController.registerUser);

module.exports = registerRouter;
