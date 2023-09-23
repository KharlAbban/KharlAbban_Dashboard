const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("Welcome to Users.");
});

module.exports = userRouter;