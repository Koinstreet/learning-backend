const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const startupSchema = new Schema({
  startupImage: String,
  startupOwner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
  },
  shareOwner: {
    type: Boolean,
  },
  targetAmount: {
    type: Number,
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
  roadmap: {
    type: Array,
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
  problem: {
    type: String,
  },
  solution: {
    type: String,
  },
  business_model: {
    type: String,
  },
  revenue_stream: {
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
