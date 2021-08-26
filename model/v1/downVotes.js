const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UpVoteSchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  proposal_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
    required: true,
  },
}, {
  timestamps: true
});

const UpVote = mongoose.model("UpVote", UpVoteSchema);

module.exports = UpVote;