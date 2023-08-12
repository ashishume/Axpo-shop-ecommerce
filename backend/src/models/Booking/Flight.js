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
    // required: true,
  },
  destinationLocation: {
    type: String,
    // required: true,
  },
  fromTime: {
    type: String,
    required: true,
  },
  toTime: {
    type: String,
    required: true,
  },
});

const Flight = mongoose.model("flight", flightSchema);

module.exports = Flight;
