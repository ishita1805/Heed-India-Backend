const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  number: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Stat", statSchema);
