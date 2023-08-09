const express = require("express");
const app = express();
const port = 4000;
const searchRoutes = require("./src/routes/SearchProducts");
const userRoutes = require("./src/routes/Auth");
const productRoutes = require("./src/routes/Products");
const categoryRoutes = require("./src/routes/Category");
const cartRoutes = require("./src/routes/Cart");
const orderRoutes = require("./src/routes/Orders");
const swaggerDoc = require("./src/controllers/swagger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
require("./src/controllers/db-connect");
app.use(cookieParser());

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);


app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", searchRoutes);
app.use("/api/v1", orderRoutes);
app.use(swaggerDoc);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
