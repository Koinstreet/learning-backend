const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  cost: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  project_name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  team_size: {
    type: Number,
  },
  launch_date: {
    type: Date,
  },
}, {
  timestamps: true
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
