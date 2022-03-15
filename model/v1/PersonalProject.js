const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PersonalProjectSchema = new Schema(
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
    status: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    checkList: {
      type: Array
    },
    date: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const PersonalProject = mongoose.model(
  "PersonalProject",
  PersonalProjectSchema
);

module.exports = PersonalProject;
