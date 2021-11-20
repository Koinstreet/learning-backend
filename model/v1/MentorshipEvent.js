const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorshipEventSchema = new Schema(
  {
    title: String,
    mentorship_id: { type: mongoose.Schema.Types.ObjectId, ref: "Mentorship" },
    description: String,
  },

  {
    timestamps: true,
  }
);

const MentorshipEvents = mongoose.model(
  "MentorshipEvents",
  mentorshipEventSchema
);

module.exports = MentorshipEvents;
