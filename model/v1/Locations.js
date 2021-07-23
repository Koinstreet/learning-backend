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
    required: true
  },
  chapter_leader: {
    type: String,
  },
  chapter_type: {
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
