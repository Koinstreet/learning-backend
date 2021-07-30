const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EnrolledCourseSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
    unique: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedModules: {
    type: Number,
    default: 0,
  },
  completionRate: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

const EnrolledCourse = mongoose.model("EnrollCourse", EnrolledCourseSchema);

module.exports = EnrolledCourse;