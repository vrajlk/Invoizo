const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bill",
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Order", OrderSchema)
