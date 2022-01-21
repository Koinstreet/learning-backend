const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExperienceSchema = new Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    link: {
      type: String
    },
    image: {
      type: String
    },
    jobTitle: {
      type: String
    },
    company: {
      type: String
    },
    from: {
      type: Date
    },
    location: {
      type: String
    },
    major: {
      type: String
    },
    to: {
      type: Date
    },
    current: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

const Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = Experience;
