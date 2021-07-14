const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  job_title: {
    type: String,
    required: true,
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
