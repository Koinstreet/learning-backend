const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  interest: {
    type: Array,
  },
  passion: {
    type: Array,
  },
  profession: {
    type: String,
  },
  level: {
    type: String,
  },
  school: {
    type: String,
  },
  reasons: {
    type: String,
  },
  support: {
    type: String,
  },
  interestedMembers: {
    type: Number,
  },
  contact: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
}, {
  timestamps: true
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
