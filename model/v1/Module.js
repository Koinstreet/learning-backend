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
  moduleId: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
