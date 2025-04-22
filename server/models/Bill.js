const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const LineItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

const BillSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: "User",
    required: true,
  },
  billNumber: {
   type:Number
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  lineItems: [LineItemSchema],
  status: {
    type: String,
    enum: ["Pending", "Paid", "Overdue", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
},
{ timestamps: true });

// This will auto-increment billNumber per userId
BillSchema.plugin(AutoIncrement, {
  inc_field: 'billNumber',
  id: 'bill_seq', // this is the internal counter name in DB
  reference_fields: ['userId'], // makes counter per userId
  start_seq: 1,
});

module.exports = mongoose.model("Bill", BillSchema)
