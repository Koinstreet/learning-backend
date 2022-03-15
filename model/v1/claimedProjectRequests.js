const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClaimedProjectsSchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "high", "medium"],
  }, 
}, {
  timestamps: true
});

const ClaimedProjects = mongoose.model("ClaimedProjects", ClaimedProjectsSchema);

module.exports = ClaimedProjects;
