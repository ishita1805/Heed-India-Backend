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
  receipt: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
