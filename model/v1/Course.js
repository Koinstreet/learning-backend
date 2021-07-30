const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  image: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  totalModules: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
  },
  highlight: {
    type: String,
    required: true,
  },
  earn: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
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