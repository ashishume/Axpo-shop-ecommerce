const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  flightNo: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  brandLogo: {
    type: String,
  },
  sourceAirport: {
    type: String,
    required: true,
  },
  destinationAirport: {
    type: String,
    required: true,
  },
  sourceLocation: {
    type: String,
  },
  destinationLocation: {
    type: String,
  },
  fromTime: {
    type: String,
    required: true,
  },
  toTime: {
    type: String,
    required: true,
  },
  timeDiff: {
    type: "String",
  },
  price: {
    type: Number,
    required: true,
  },
});

const Flight = mongoose.model("flight", flightSchema);

module.exports = Flight;
