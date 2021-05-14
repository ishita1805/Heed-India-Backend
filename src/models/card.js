const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  media: {
    type: String,
    required: true
  },
  pid: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Card", cardSchema);
