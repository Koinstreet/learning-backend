const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProposalViewSchema = new Schema({
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
}, {
  timestamps: true
});

const ProposalView = mongoose.model("ProposalView", ProposalViewSchema);

module.exports = ProposalView;