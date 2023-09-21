const express = require("express");
const router = express.Router();
const TrainBooking = require("../../models/Booking/trainBooking");
const authenticateToken = require("../../controllers/authMiddleware");
const stationData = require("../../constants/stations");
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
      "stations.railwayStation": source,
      "stations.railwayStation": destination,
    });
    let sourceIndex = null;
    let destinationIndex = null;
    if (trains) {
      trains.forEach((train) => {
        train.stations.forEach((station, index) => {
          if (source === station.railwayStation) {
            sourceIndex = index;
          }
          if (destination === station.railwayStation) {
            destinationIndex = index;
          }
        });
      });
    }
    if (sourceIndex < destinationIndex) {
      const sourceData = stationData.stations.find((value) => value.railwayStation === source);
      const destinationData = stationData.stations.find((value) => value.railwayStation === destination);
      return res.status(201).json({
        trains,
        source: sourceData,
        destination: destinationData,
      });
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** get all trains */
router.get("/trains", async (req, res) => {
  try {
    const trains = await TrainBooking.find();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
