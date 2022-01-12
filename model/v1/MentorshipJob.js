const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorshipJobSchema = new Schema(
  {
    title: String,
    mentorship_id: { type: mongoose.Schema.Types.ObjectId, ref: "Mentorship" },
    company: { name: String, location: String, size: String },
    description: String,
  },

  {
    timestamps: true,
  }
);

const MentorshipJob = mongoose.model("MentorshipJob", mentorshipJobSchema);

module.exports = MentorshipJob;
