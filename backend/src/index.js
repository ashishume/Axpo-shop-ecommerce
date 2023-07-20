const express = require("express");
const app = express();
const port = 3000;
const userRoutes = require("./routes/Users");
const productRoutes = require("./routes/Products");
const categoryRoutes = require("./routes/Category");
const cartRoutes = require("./routes/Cart");
const swaggerDoc = require("./swagger");

const cors = require("cors");
require("./db-connect");

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", cartRoutes);
app.use(swaggerDoc);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
