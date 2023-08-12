const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create and save a new user
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isAlreadySignedUp = await User.findOne({ email });
    if (!isAlreadySignedUp) {
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json({ message: "signed up successfully", name, email });
    } else {
      res.status(409).json({ message: "User already registered, please login" });
    }
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
      throw new Error("Please enter a valid password");
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "2h" });
    res.cookie("jwt", token, { httpOnly: true, sameSite: "none", secure: true });
    res.json({ user: user._id, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/validate", async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const authTokenExp = jwt.verify(token, process.env.SECRET_KEY);
      res.status(200).json({
        isLoggedIn: true,
        authTokenExp,
      });
    } else {
      res.status(401).json({ isLoggedIn: false });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", isLoggedIn: false });
  }
});
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
