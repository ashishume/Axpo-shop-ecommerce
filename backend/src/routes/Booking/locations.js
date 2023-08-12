const express = require("express");
const router = express.Router();
const { locations } = require("../../constants/locations");
const authenticateToken = require("../../controllers/authMiddleware");

router.get("/locations", authenticateToken, async (req, res) => {
  try {
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
