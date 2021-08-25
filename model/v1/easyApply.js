const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EasyApplySchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Jobs",
    required: true,
  },
  firstName: {
    type: String,
    required: true
  }, 
  lastName: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  relevant_experience: {
    type: String,
  },
  company: {
    type: String,
  },
  resume: {
    type: String,
  },
  approved: {
    type: Boolean,
  },
}, {
  timestamps: true
});

const EasyApply = mongoose.model("EasyApply", EasyApplySchema);

module.exports = EasyApply;
