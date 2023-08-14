const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flightBookingSchema = new mongoose.Schema({
  flight: { type: Schema.Types.ObjectId, ref: "flight", required: true },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    default: Date.now(),
  },
  bookingClass: {
    type: String,
    required: true,
    enum: ["Economy", "Business", "First"],
  },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  price: {
    type: Number,
    required: true,
  },
  seatId: [
    {
      type: String,
    },
  ],
  passengerDetails: [
    {
      name: {
        type: String,
      },
      age: {
        type: String,
      },
    },
  ],
});

const FlightBooking = mongoose.model("flightBooking", flightBookingSchema);

module.exports = FlightBooking;
