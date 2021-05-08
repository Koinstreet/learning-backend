const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  education: {
      type: String,
  },
  skill_level: {
    type: Number,
    required: true,
  },
  availability: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
  },
  language: {
    type: String,
  },
  country: {
    type: String,
  },
  lookingfor_learningstyle: {
    type: Array,
  },
  lookingfor_personalType: {
    type: Array,
  },
  lookingfor_availabilty: {
    type: Number,
  },
  lookingfor_interest: {
    type: Array,
  },
  why_mentor: {
    type: String,
  },
}, {
  timestamps: true
});

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
