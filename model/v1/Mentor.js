const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    interest_in: {
      type: String,
    },
    skill_level: {
      type: Number,
    },
    availability: {
      type: String,
    },
    country: {
      type: String,
    },
    personal_type: {
      type: String,
    },
    qr_code: String,
    occupation: String,
    work_place: String,
    lookingfor_learningstyle: {
      type: String,
    },
    lookingfor_education: {
      type: String,
    },
    lookingfor_skillLevel: {
      type: String,
    },
    lookingfor_personalType: {
      type: String,
    },
    lookingfor_availabilty: {
      type: String,
    },
    lookingfor_interest: {
      type: String,
    },
    why_mentor: {
      type: String,
    },
    calender_events: [
      { title: String, event_date: String, description: String },
    ],
  },
  {
    timestamps: true,
  }
);

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
