const express = require("express");
const router = express.Router();

router.use(express.static("frontend/NOTES"));
router.use(express.json());

router.get("/", (req, res) => {
  res.send("Notes Homepage");
});

router.get("/new", (req, res) => {
  res.send("Add New Note");
});

module.exports = router;
