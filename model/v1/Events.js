const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  EventPicture: {
    type: String,
  },
  catName: {
    type: String,
    required: true,
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
