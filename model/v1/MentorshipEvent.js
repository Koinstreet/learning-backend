const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorshipEventSchema = new Schema(
  {
    name: String,
    speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    audiences: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posted_date: String,
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
