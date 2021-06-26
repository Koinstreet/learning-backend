const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  EventPicture: {
    type: String,
  },
  catName: {
    type: String,
    required: true,
  },
  EventDescription: {
    type: String,
    required: true,
  },
  Featured:{
    type: Boolean
  },
  eventName: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
  },
  eventLink: {
    type: String,
    required: true,
  },
  actionLink: {
      type: String,
      required: true,
    },
    callToAction: {
        type: String,
        required: true,
    },
}, {
  timestamps: true
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
