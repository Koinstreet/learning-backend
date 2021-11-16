const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorshipJobSchema = new Schema(
  {
    name: String,
    company: { name: String, location: String, size: String },
    posted_date: String,
    description: String,
  },

  {
    timestamps: true,
  }
);

const Capstone = mongoose.model("MentorshipJob", mentorshipJobSchema);

module.exports = Capstone;
