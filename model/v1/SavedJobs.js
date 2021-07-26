const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SavedJobsSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs",
    required: true,
  }
}, {
  timestamps: true
});

const SavedJobs = mongoose.model("SavedJobs", SavedJobsSchema);

module.exports = SavedJobs;