const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorshipCourseSchema = new Schema(
  {
    name: String,
    mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    mentees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    progress_percentage: String,
    description: String,
  },

  {
    timestamps: true,
  }
);

const MentorshipCourse = mongoose.model(
  "MentorshipCourse",
  mentorshipCourseSchema
);

module.exports = MentorshipCourse;
