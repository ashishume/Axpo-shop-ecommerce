const mongoose = require("mongoose");

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Create the User model
const User = mongoose.model("category", categorySchema);

module.exports = User;
