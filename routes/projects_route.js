const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Projects Homepage");
});

module.exports = router;