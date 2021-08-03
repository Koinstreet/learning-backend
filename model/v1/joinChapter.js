const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JoinChapterSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chapterLocation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    unique: false,
    required: true,
  },
  approved: {
      type: Boolean,
      default: false,
  }
}, {
  timestamps: true
});

const JoinChapter = mongoose.model("JoinChapter", JoinChapterSchema);

module.exports = JoinChapter;