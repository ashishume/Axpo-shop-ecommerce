const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create and save a new user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "user created", name, email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.cookie("jwt", token, { httpOnly: true });
    res.json({ token, user: user._id, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/validate", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const authTokenExp = jwt.verify(token, process.env.SECRET_KEY);
    res.status(200).json(authTokenExp);
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
