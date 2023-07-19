const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Create and save a new cart
router.post("/cart", async (req, res) => {
  try {
    const { items, user } = req.body;
    const newCart = new Cart({ items, user });
    await newCart.save();
    res.status(201).json({ message: "cart updated", cart: req.body });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to cart." });
  }
});

router.get("/cart", async (req, res) => {
  try {
    const { user } = req.query;
    const cartData = await Cart.find({ user }).populate({
      path: "items.product",    //fetches the whole data from product table 
      select: "-__v -_id",  //excludes these values while fetching from product table
    });
    res.status(200).json(cartData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart data." });
  }
});

module.exports = router;
