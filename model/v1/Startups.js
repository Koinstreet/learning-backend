const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const startupSchema = new Schema({
  startupImage: String,
  startupOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  amount: {
    type: String,
  },
  shareOwner: {
    type: Boolean,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  shareOffered: {
    type: Number,
  },
  shares: {
    type: Number,
  },
  totalShare: {
    type: Number,
  },
  valuation: {
    type: Number,
  },
  website: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  facebookLink: {
    type: String,
  },
  linkedInLink: {
    type: String,
  },
  location: {
    type: Array,
    required: true,
  },
  teamSizeMin: {
    type: Number,
  },
  teamSizeMax: {
    type: Number,
  },
  userBase: {
    type: Number,
  },
  teamMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: {
    type: Array,
  },
  about: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
  },
  found: {
    type: String,
  },
}, {
  timestamps: true
});

const Startup = mongoose.model("Startup", startupSchema);

module.exports = Startup;
