const mongoose = require("mongoose")

const RevenueSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model("Revenue", RevenueSchema)
