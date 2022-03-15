const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  project_name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
  },
  project_budget: {
    type: String,
  },
  budget_currency: {
    type: String,
  },
  project_stacks: {
    type: Array,
  },
  PM_fullName: {
    type: String,
  },
  Agree_terms: {
    type: Boolean,
    default: false,
  },
  project_size: {
    type: String,
  },
  project_details: {
    type: String,
  },
  webiste: {
    type: String,
  },
  project_tags: {
    type: Array,
  },
  PM_email: {
    type: String,
  },
  contact_email: {
    type: String,
    required: true,
  },
  team_size: {
    type: Number,
  },
  launch_date: {
    type: String,
  },
  pay_option: {
    type: String,
  },
  claimed: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
