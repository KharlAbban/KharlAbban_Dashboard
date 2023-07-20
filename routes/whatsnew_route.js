const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Whats New Homepage");
});

module.exports = router;