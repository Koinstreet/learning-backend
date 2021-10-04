const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const proposalStatusSchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  proposal_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proposal",
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  denialReason: {
    type: String,
  },
}, {
  timestamps: true
});

const ProposalStatus = mongoose.model("ProposalStatus", proposalStatusSchema);

module.exports = ProposalStatus;