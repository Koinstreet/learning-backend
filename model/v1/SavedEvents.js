const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SavedEventsSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
    unique: true
  },
  attending: {
    type: String,
    enum: ["yes", "no", "maybe"],
    required: true,
  },
}, {
  timestamps: true
});

const SavedEvents = mongoose.model("SavedEvents", SavedEventsSchema);

module.exports = SavedEvents;
