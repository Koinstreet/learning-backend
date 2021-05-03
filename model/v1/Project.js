const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  requirements: {
    type: String,
  },
  likelihood_to_hire: {
      type: String
  },
  tech_stack: {
    type: String
  },
  type_of_business: {
    type: String
  },
  industry_of_business: {
    type: String,
    required: true,
  },
  deployment_deadline: {
    type: String
  },
  estimated_budget_range: {
    type: Number,
  },
  additional_details: {
      type: String
  }
  
}, {
  timestamps: true
});

const Projects = mongoose.model("Projects", projectSchema);

module.exports = Projects;
