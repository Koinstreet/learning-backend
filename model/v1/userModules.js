const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userModulesSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
    unique: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completionStatus: {
    type: String,
    default: 'uncompleted',
  },
  completionRate: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

const userModules = mongoose.model("userModules", userModulesSchema);

module.exports = userModules;