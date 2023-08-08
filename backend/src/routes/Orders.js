const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders")
const authenticateToken = require("../controllers/authMiddleware");

router.post("/orders/create", async (req, res) => {
  try {
    const { user, products } = req.body;
    const newOrders = new Orders({ user, products });
    await newOrders.save();
    res.status(201).json({ message: "orders created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Orders.find({
      user: userId,
    }).select("-__v");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
