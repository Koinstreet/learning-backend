const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const viewedCourseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  viewedModules: {
    type: Array,
  },
});

const ViewedCourse = mongoose.model("ViewedCourse", viewedCourseSchema);

module.exports = ViewedCourse;
