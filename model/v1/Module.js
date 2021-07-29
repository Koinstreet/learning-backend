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
  image: {
    type: String
  },
  url: {
      type: String
  },
  name: {
    type: String,
    required: true,
  },
  
  type: {
    type: String,
  },
  duration: {
    type: String
  },
  description: {
    type: String
  },
  content: {
    type: Object,
  },
},
{
  timestamps: true
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
