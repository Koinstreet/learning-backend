const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DownVoteSchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  proposal_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
    required: false,
  },
  startup_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Startup",
    required: false,
  },
}, {
  timestamps: true
});

const DownVote = mongoose.model("DownVote", DownVoteSchema);

module.exports = DownVote;