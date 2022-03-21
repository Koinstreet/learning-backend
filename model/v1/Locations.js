const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema(
  {
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    LocationLogo: {
      type: String,
    },
    LocationName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    chapter_leader: {
      type: String,
    },
    advisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chapter_type: {
      type: String,
      default: "National",
    },
    member_size: {
      type: String,
    },
    date_founded: {
      type: Date,
    },
    // chapter form
    mission: {
      type: String,
    },
    interest: {
      type: Array,
    },
    passion: {
      type: Array,
    },
    profession: {
      type: String,
    },
    interestedMembers: {
      type: Number,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
