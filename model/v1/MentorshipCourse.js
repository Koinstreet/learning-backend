const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorshipCourseSchema = new Schema(
  {
    title: String,
    mentorship_id: { type: mongoose.Schema.Types.ObjectId, ref: "Mentorship" },
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
