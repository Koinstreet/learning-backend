const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sprintSchema = new Schema(
  {
    title: String,
    mentorship_id: { type: mongoose.Schema.Types.ObjectId, ref: "Mentorship" },
    progress_percentage: String,
    description: String,
  },

  {
    timestamps: true,
  }
);

const Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;
