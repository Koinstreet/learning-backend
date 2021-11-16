const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workshopSchema = new Schema(
  {
    name: String,
    mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    mentees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    progress_percentage: String,
    posted_date: String,
    description: String,
  },

  {
    timestamps: true,
  }
);

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
