const express = require("express");
const app = express();

const searchRoutes = require("./src/routes/SearchProducts");
const userRoutes = require("./src/routes/Auth");
const productRoutes = require("./src/routes/Products");
const categoryRoutes = require("./src/routes/Category");
const cartRoutes = require("./src/routes/Cart");
const orderRoutes = require("./src/routes/Orders");
const flightRoutes = require("./src/routes/Booking/Flight");
const flightBookingRoutes = require("./src/routes/Booking/Flightbookings");
const flightSeatBookingRoutes = require("./src/routes/Booking/SeatBookings");
const locations = require("./src/routes/Booking/locations");

[
  userRoutes,
  productRoutes,
  categoryRoutes,
  cartRoutes,
  searchRoutes,
  orderRoutes,
  flightRoutes,
  flightSeatBookingRoutes,
  flightBookingRoutes,
  locations,
].forEach((apiRoutes) => app.use("/api/v1", apiRoutes));
module.exports = app;
