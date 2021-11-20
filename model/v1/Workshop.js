const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workshopSchema = new Schema(
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

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = Workshop;
