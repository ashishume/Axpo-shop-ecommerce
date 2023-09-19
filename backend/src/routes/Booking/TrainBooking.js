const express = require("express");
const router = express.Router();
const TrainBooking = require("../../models/Booking/trainBooking");
const authenticateToken = require("../../controllers/authMiddleware");

router.post("/train/book", async (req, res) => {
  try {
    const { trainNo, stations, fromDate, toDate, time } = req.body;

    const trainBookingData = new TrainBooking({
      trainNo,
      stations,
      fromDate,
      toDate,
      time,
    });
    const result = await trainBookingData.save();
    res.status(201).json({ message: "train booked", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/trains", async (req, res) => {
  try {
    const { source, destination } = req.body;
    const trains = await TrainBooking.find({
      "stations.location": source,
      "stations.location": destination,
    });

    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
