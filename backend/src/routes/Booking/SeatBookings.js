const express = require("express");
const router = express.Router();
const FlightSeatBooking = require("../../models/Booking/SeatBooking");
const authenticateToken = require("../../controllers/authMiddleware");
const { generateSeatsData } = require("../../controllers/Booking/assignSeats");

/** fetch seats based on flightid and fromDate */
router.post("/flights/seats", async (req, res) => {
  try {
    const { flight, fromDate } = req.body;
    const result = await FlightSeatBooking.findOne({
      flight,
      fromDate,
    });

    if (!result) {
      const seatStructure = generateSeatsData();
      const createSeatBooking = new FlightSeatBooking({
        flight,
        seatStructure,
        fromDate,
      });
      const savedSeatData = await createSeatBooking.save();
      return res.status(201).json(savedSeatData);
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
