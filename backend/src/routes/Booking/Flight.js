const express = require("express");
const router = express.Router();
const Flight = require("../../models/Booking/Flight");
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
    } = req.body;

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
    });
    await flightData.save();
    res.status(201).json({ message: "flight created", flight: flightData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/flights", async (req, res) => {
  try {
    const flights = await Flight.find().select("-__v");
    res.status(201).json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/flight/:flightId", async (req, res) => {
  try {
    const { flightId } = req.params;
    const flight = await Flight.findById(flightId).select("-__v");
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
