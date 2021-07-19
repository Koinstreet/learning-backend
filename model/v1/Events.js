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
    default: 'http://res.cloudinary.com/djhbhzex4/image/upload/v1626716733/images/2021-07-19T17_45_29.803Z-events_medium.jpeg.jpg'
  },
  approved: {
    type: Boolean,
    default: false
  },
  catName: {
    type: String,
  },
  EventDescription: {
    type: String,
    required: true,
  },
  Featured:{
    type: Boolean,
    default: false,
  },
  Virtual:{
    type: Boolean,
    default: false,
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
    },
    callToAction: {
        type: String,
    },
}, {
  timestamps: true
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
