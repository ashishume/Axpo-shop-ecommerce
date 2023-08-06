const mongoose = require("mongoose");

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

// Create the Category model
const Category = mongoose.model("category", categorySchema);

module.exports = Category;
