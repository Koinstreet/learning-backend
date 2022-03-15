const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const minorityEarnedSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  number: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
  },
}, {
  timestamps: true
});

const MinorityEarned = mongoose.model("MinorityEarned", minorityEarnedSchema);

module.exports = MinorityEarned;
