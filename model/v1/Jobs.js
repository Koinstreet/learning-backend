const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: "60f1b3820739be002a24dcae",
    ref: "Company",
  },
  job_title: {
    type: String,
    required: true,
  },
  easy_apply: {
    type: Boolean,
    default: false,
  },
  application_link: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  job_industry: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  remote: {
    type: Boolean,
  },
  job_type: {
    type: String,
  },
  pay: {
    type: Number,
  },
  weekly_hours: {
    type: Number,
  },
  is_deleted: {
    type: Boolean,
  }, 
  additional_compensation: {
    type: String,
  }, 
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  benefits: {
    type: String,
  },
  hiring_rate: {
    type: Number,
  },
  min_requirements: {
    type: Array,
  },
}, {
  timestamps: true
});

const Jobs = mongoose.model("Jobs", jobSchema);

module.exports = Jobs;
