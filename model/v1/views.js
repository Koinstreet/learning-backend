const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ViewSchema = new Schema({
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

const View = mongoose.model("View", ViewSchema);

module.exports = View;