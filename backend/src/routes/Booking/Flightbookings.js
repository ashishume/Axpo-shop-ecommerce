const express = require("express");
const router = express.Router();
const FlightBooking = require("../../models/Booking/FlightBooking");
const FlightSeatBooking = require("../../models/Booking/SeatBooking");
const authenticateToken = require("../../controllers/authMiddleware");

router.post("/flight/book", async (req, res) => {
  try {
    const { flight, fromDate, toDate, bookingClass, user, price, passengerDetails, seatId } = req.body;

    const flightBookingData = new FlightBooking({
      flight,
      fromDate,
      toDate,
      bookingClass,
      user,
      price,
      passengerDetails,
      seatId, //TODO: figure out booking for multple seatIds (for now it works for only 1 seat)
    });
    await flightBookingData.save();

    //update seat ids of passengers on that specfic date
    const seatBooking = await FlightSeatBooking.findOne({ flight, fromDate });
    const updatedSeats = seatBooking.toObject();
    for (const row of updatedSeats.seatStructure) {
      for (const column of row.columns) {
        if (column.seatId === seatId) {
          column.isBooked = true;
          break;
        }
      }
    }
    const result = await FlightSeatBooking.findOneAndUpdate(
      { flight, fromDate },
      { $set: { seatStructure: updatedSeats.seatStructure } },
      { new: true }
    );

    res.status(201).json({ message: "flight booked", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/flights/bookings/:userId", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await FlightBooking.find({
      user: userId,
    })
      .populate("flight")
      .populate("user")
      .select("-__v")
      .exec();
    res.status(201).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
