const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorshipSchema = new Schema(
  {
    // mentor_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Mentor",
    // },
    // mentee_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Mentee",
    // },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mentees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    status: {
      type: Boolean,
      default: false,
    },

    qr_code: {
      data: Buffer,
      contentType: String,
    },

    calender_events: [
      { name: String, event_date: String, description: String },
    ],

    capstones: [{ type: mongoose.Schema.Types.ObjectId, ref: "Capstone" }],

    resume_workshops: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Workshop" },
    ],

    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "MentorshipEvents" }],

    courses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MentorshipCourse" },
    ],

    job_portals: [
      { type: mongoose.Schema.Types.ObjectId, ref: "MentorshipJob" },
    ],

    resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],

    sprints: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sprint" }],
  },

  {
    timestamps: true,
  }
);

const Mentorship = mongoose.model("Mentorship", mentorshipSchema);

module.exports = Mentorship;
