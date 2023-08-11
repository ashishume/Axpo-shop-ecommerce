const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const columnDataSchema = new mongoose.Schema({
  seatId: String,
  isBooked: Boolean,
});

const rowDataSchema = new mongoose.Schema({
  columns: [columnDataSchema],
  id: Number,
});

const flightSeatSchema = new mongoose.Schema({
  flight: { type: Schema.Types.ObjectId, ref: "flight", required: true },
  seatStructure: [rowDataSchema],
  fromDate: { type: Date, required: true },
});

const FlightSeatSchema = mongoose.model("seats", flightSeatSchema);

module.exports = FlightSeatSchema;
