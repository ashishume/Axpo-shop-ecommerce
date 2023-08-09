const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const Cart = require("../models/Cart");
const authenticateToken = require("../controllers/authMiddleware");

router.post("/orders/create", authenticateToken, async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;
    const newOrders = new Orders({ user, products, orderDate: Date.now(), address: "", totalAmount });
    await newOrders.save();
    const productIds = products.map((value) => value.product);
    if (productIds?.length) {
      /** when order is placed successfully delete the cart data */
      const cart = await Cart.deleteMany({ product: { $in: productIds }, user });
      if (cart) res.status(201).json({ message: "Orders placed successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/orders/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Orders.find({
      user: userId,
    })
      .populate({
        path: "products.product",
        select: "-__v",
      })
      .select("-__v");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
