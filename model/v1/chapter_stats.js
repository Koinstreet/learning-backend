const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chapterStatSchema = new Schema({
  place: {
    type: String,
  },
  amount: {
    type: Number,
  },
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  time: {
    type: Date,
  },
}, {
  timestamps: true
});

const ChapterStats = mongoose.model("ChapterStats", chapterStatSchema);

module.exports = ChapterStats;
