const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorshipSchema = new Schema(
  {
    mentor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
    },
    mentee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentee",
    },

    status: {
      type: Boolean,
      default: false,
    },

    qr_code: String,

    calender_events: [
      { title: String, event_date: String, description: String },
    ],
  },

  {
    timestamps: true,
  }
);

const Mentorship = mongoose.model("Mentorship", mentorshipSchema);

module.exports = Mentorship;
