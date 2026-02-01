const express = require("express");
const router = express.Router();
const { markComplete } = require("../controllers/progressController");

router.post("/complete", markComplete);

module.exports = router;
