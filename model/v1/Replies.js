const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const repliesSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  proposal_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
    required: true,
  },
  comment: {
    type: String,
  },
}, {
  timestamps: true
});

const Replies = mongoose.model("Replies", repliesSchema);

module.exports = Replies;