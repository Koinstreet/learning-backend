const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EducationSchema = new Schema(
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
    name: {
      type: String
    },
    date: {
      type: Date
    },
    major: {
      type: String
    },
    gradDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Education = mongoose.model("Education", EducationSchema);

module.exports = Education;
