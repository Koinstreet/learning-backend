const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const achievementSchema = new Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    link: {
      type: String
    },
    status: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    description: {
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

const achievement = mongoose.model("achievement", achievementSchema);

module.exports = achievement;
