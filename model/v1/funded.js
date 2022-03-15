const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fundedSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  startup_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Startup",
  },
  amount: {
    type: Number,
    default: 0,
  },

}, {
  timestamps: true
});

const Funded = mongoose.model("Funded", fundedSchema);

module.exports = Funded;
