const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menteeSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  interest_in: {
      type: Array,
  },
  learning_style: {
    type: String,
  },
  personal_type: {
    type: String,
  },
  gender: {
    type: String,
  },
  usage_phone: {
    type: Number,
  },
  lookingfor_education: {
    type: Array,
  },
  lookingfor_skillLevel: {
    type: Number,
  },
  lookingfor_learningstyle: {
    type: Array,
  },
  lookingfor_gender: {
    type: String,
  },
  lookingfor_availabilty: {
    type: Number,
  },
  lookingfor_language: {
    type: Array,
  },
  lookingfor_country: {
    type: Array,
  },
  goals: {
    type: String,
  },
}, {
  timestamps: true
});

const Mentee = mongoose.model("Mentee", menteeSchema);

module.exports = Mentee;
