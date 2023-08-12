const express = require("express");
const router = express.Router();
const Flight = require("../../models/Booking/Flight");
const calculateTimeDifference = require("../../controllers/Booking/calculateTimeDiff");
const authenticateToken = require("../../controllers/authMiddleware");
router.post("/flight", async (req, res) => {
  try {
    const {
      flightNo,
      brand,
      brandLogo,
      sourceAirport,
      destinationAirport,
      sourceLocation,
      destinationLocation,
      fromTime,
      toTime,
      price,
    } = req.body;
    const timeDiff = calculateTimeDifference(fromTime, toTime);
    const flightData = new Flight({
      flightNo,
      brand,
      brandLogo,
      sourceAirport,
      destinationAirport,
      sourceLocation,
      destinationLocation,
      fromTime,
      toTime,
      price,
      timeDiff,
    });

    await flightData.save();
    res.status(201).json({ message: "flight created", flight: flightData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/flights", authenticateToken, async (req, res) => {
  try {
    const flights = await Flight.find().select("-__v");
    res.status(201).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/flight/:flightId", authenticateToken, async (req, res) => {
  try {
    const { flightId } = req.params;
    const flight = await Flight.findById(flightId).select("-__v");
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
