const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menteeSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    interest_in: {
      type: String
    },
    learning_style: {
      type: String
    },
    personal_type: {
      type: String
    },
    usage_phone: {
      type: Number
    },
    availability: {
      type: String
    },
    qr_code: String,
    occupation: String,
    work_place: String,
    lookingfor_education: {
      type: String
    },
    lookingfor_skillLevel: {
      type: String
    },
    lookingfor_learningstyle: {
      type: String
    },
    lookingfor_gender: {
      type: String
    },
    lookingfor_availabilty: {
      type: String
    },
    lookingfor_language: {
      type: Array
    },
    lookingfor_country: {
      type: Array
    },
    lookingfor_ethnicity: {
      type: String
    },
    goals: {
      type: String
    },
    suggestions: {
      type: Array
    },
    calender_events: [
      { title: String, event_date: String, description: String }
    ],
    qr_code: String
  },
  {
    timestamps: true
  }
);

const Mentee = mongoose.model("Mentee", menteeSchema);

module.exports = Mentee;
