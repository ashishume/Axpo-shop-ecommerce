const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const authenticateToken = require("../controllers/authMiddleware");

// fetch all search value products
router.get("/search", authenticateToken, async (req, res) => {
  try {
    const { searchValue } = req.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: searchValue, $options: "i" } }, // Case-insensitive search
        { brand: { $regex: searchValue, $options: "i" } }, // Case-insensitive search
        { description: { $regex: searchValue, $options: "i" } }, // Case-insensitive search
      ],
    }).select("-__v");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
