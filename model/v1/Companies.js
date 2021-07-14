const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  company_name: {
    type: String,
    required: true,
  },
  company_description: {
    type: String,
    required: true,
  },
  specialties: {
    type: Array,
  },
  started_at: {
    type: Date,
  },
  mpa_relationship_started: {
    type: Date,
  },
  locations: {
    type: Array,
  },
  type_company: {
    type: String,
  },
  relation_type: {
    type: String,
  },
  size_company: {
    type: String,
  },
  headquarter: {
    type: String,
    required: true,
  },
  total_dollars_given: {
    type: Number,
  }, 
  diversity_score: {
    type: String,
  }, 
  social_media_links: {
    type: Array,
  },
  website: {
    type: String,
  },
}, {
  timestamps: true
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
