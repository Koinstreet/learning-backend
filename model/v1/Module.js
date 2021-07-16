const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
  },
  ActivityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Activity",
  },
  name: {
    type: String,
    required: true,
  },
  week: {
    type: String,
    required: true,
  },
  completed: {
    type: String,
    default: false,
  },
  completionStatus: {
    type: String,
    default: 'uncompleted',
  },
  completionRate: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
},
{
  timestamps: true
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
