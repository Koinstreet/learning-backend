const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  LocationLogo: {
    type: String,
  },
  LocationIcon: {
    type: String,
  },
  LocationName: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  chapter_leader: {
    type: String,
  },
  member_size: {
    type: String,
  },
  date_founded: {
      type: Date,
    },
}, {
  timestamps: true
});

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
