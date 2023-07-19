const mongoose = require("mongoose");
const dotenv = require('dotenv'); 
dotenv.config(); // Load environment variables from .env file

const databaseUrl = process.env.DB_CONNECTION_STR;


// Establish the database connection
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Event listeners to track the status of the connection
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

module.exports = db;
