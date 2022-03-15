const mongoose = require("mongoose");

const ReputationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    startUp_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup"
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    },
    chapter_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location"
    },
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobs"
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },
    description: {
      type: String
    },
    type: {
      type: String,
      enum: [
        "User",
        "jobApplyCount",
        "Project",
        "eventRegisterCount",
        "Startup",
        "Chapter",
        "courseEnroll",
        "courseFinish"
      ]
    },
    courseEnrollCount: {
      type: Number,
      default: 0
    },
    courseFinishCount: {
      type: Number,
      default: 0
    },
    eventRegisterCount: {
      type: Number,
      default: 0
    },
    projectCount: {
      type: Number,
      default: 0
    },
    userCount: {
      type: Number,
      default: 0
    },
    startupCount: {
      type: Number,
      default: 0
    },
    chapterCount: {
      type: Number,
      default: 0
    },
    jobApplyCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Reputation = mongoose.model("Reputation", ReputationSchema);

module.exports = Reputation;
