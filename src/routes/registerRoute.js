const express = require("express");
const registerRouter = express.Router();
// Import Controller Functions
// const registerController = require("../controllers/registerController");

registerRouter.use(express.json());

// registerRouter.get("/", registerController.showRegisterPage);
registerRouter.get("/", (req, res) => res.render("register"));
// registerRouter.post("/", registerController.registerUser);

module.exports = registerRouter;
