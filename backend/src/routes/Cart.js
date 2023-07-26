const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const authenticateToken = require("../controllers/authMiddleware");

// Create and save a new cart
router.post("/cart", authenticateToken, async (req, res) => {
  try {
    const { product, quantity, user } = req.body;
    const isAlreadyProduct = await Cart.findOne({ user, product });
    if (!isAlreadyProduct) {
      const newCart = new Cart({ product, quantity, user });
      await newCart.save();
      res.status(201).json({ message: "cart updated", cart: req.body });
    } else {
      res.status(200).json({ message: "already added to cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/cart/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const cartData = await Cart.find({ user: userId }).select("-__v");
    res.status(200).json(cartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/cart/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { product, quantity } = req.body;
    const cartData = await Cart.findOneAndUpdate({ user: userId, product }, { quantity }, { new: true, runValidators: true })
      .lean()
      .exec();

    res.status(200).json({
      message: "cart updated",
      cart: cartData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/cart/:userId/:productId", authenticateToken, async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cartData = await Cart.findOneAndRemove({ user: userId, product: productId });
    if (cartData) {
      res.status(200).json({ message: "product removed" });
    } else {
      res.status(401).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
