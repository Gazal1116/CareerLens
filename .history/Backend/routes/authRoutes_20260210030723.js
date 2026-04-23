const express = require("express");
const signup = require("../Controllers/authController");

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", signup);

module.exports = router;
