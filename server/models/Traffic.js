const mongoose = require("mongoose")

const TrafficSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model("Traffic", TrafficSchema)
