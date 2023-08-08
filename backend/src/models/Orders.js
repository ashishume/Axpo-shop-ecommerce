const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Orders schema
const ordersSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Create the Orders model
const Orders = mongoose.model("orders", ordersSchema);

module.exports = Orders;
