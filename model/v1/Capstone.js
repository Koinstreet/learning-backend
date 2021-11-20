const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const capstoneSchema = new Schema(
  {
    mentorship_id: { type: mongoose.Schema.Types.ObjectId, ref: "Mentorship" },
    title: String,
    progress_percentage: String,
    description: String,
  },

  {
    timestamps: true,
  }
);

const Capstone = mongoose.model("Capstone", capstoneSchema);

module.exports = Capstone;
