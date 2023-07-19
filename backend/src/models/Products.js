const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  brand: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

// Create the User model
const User = mongoose.model("product", productSchema);

module.exports = User;
