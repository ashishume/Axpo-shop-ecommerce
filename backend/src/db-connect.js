const mongoose = require("mongoose");

const databaseUrl = "mongodb+srv://ashishume:TvokYVoe3Cn1PV2E@cluster0.dytqsnd.mongodb.net/ecommerce";

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
