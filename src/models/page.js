const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  hashtag: {
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
  para: {
    type: String,
    required: true
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  stats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stat",
    },
  ],

});

module.exports = mongoose.model("Page", pageSchema);
