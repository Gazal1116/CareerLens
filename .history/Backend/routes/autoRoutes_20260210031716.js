const express = require("express");
const router = express.Router();

// Import controller
const { signup } = require("../controllers/authController");

// Signup route
router.post("/signup", signup);

module.exports = router;
