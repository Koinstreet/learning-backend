const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mentorshipSchema = new Schema(
  {
    mentor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
    },
    mentee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentee",
    },

    status: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const Mentorship = mongoose.model("Mentorship", mentorshipSchema);

module.exports = Mentorship;
