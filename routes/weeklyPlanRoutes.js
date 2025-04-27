const express = require("express");
const router = express.Router();

// Základní route pro otestování
router.get("/", (req, res) => {
  res.send("WeeklyPlan route works!");
});

module.exports = router;
