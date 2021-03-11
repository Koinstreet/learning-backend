const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  image: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  highlight: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  audience: String,
  perequisites: String,
  objectives: [String],
  published: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
