const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({
  trainNo: {
    type: String,
    required: true,
  },
  stations: [
    {
      id: {
        type: String,
      },
      location: {
        type: String,
      },
      railwayStation: {
        type: String,
      },
    },
  ],
  fromDate: {
    type: String,
  },
  toDate: {
    type: String,
  },
  time: {
    type: String,
  },
});

const Train = mongoose.model("train", trainSchema);

module.exports = Train;
