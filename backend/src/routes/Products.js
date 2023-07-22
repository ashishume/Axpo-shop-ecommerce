const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const authenticateToken = require("../authMiddleware");

// Create and save a new product
router.post("/product", authenticateToken, async (req, res) => {
  try {
    const { name, category, brand, quantity, price, image, description } = req.body;
    const newProduct = new Product({ name, category, brand, quantity, price, image, description });
    await newProduct.save();
    res.status(201).json({ message: "product added", product: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** insert multple products */
router.post("/products", authenticateToken, async (req, res) => {
  try {
    const validatedProducts = [];
    for (const product of req.body) {
      const productModel = new Product(product);
      const validationResult = productModel.validateSync();
      if (validationResult) {
        console.error(`Invalid product: ${validationResult.message}`);
        res.status(500).json({ message: error.message });
      } else {
        validatedProducts.push(product);
      }
    }

    if (validatedProducts.length > 0) {
      const insertedProducts = await Product.insertMany(validatedProducts);
      res.status(201).json({ message: "products added" });
    } else {
      res.status(500).json({ message: "No valid products to insert" });
      console.error("No valid products to insert");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** fetch multple products */
router.get("/products", authenticateToken, async (req, res) => {
  try {
    const products = await Product.find().select("-__v");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/** fetch one products */
router.get("/product/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).select("-__v");
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
