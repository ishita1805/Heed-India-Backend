const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  offerId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  pan: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: Number,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  receipt: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
