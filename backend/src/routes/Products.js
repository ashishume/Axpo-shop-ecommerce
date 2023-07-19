const express = require("express");
const router = express.Router();
const Product = require("../models/Products");

// Create and save a new product
router.post("/product", async (req, res) => {
  try {
    const { name, category, brand, quantity, price, image, description } = req.body;
    const newProduct = new Product({ name, category, brand, quantity, price, image, description });
    await newProduct.save();
    res.status(201).json({ message: "product added", product: req.body });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product." });
  }
});

module.exports = router;
