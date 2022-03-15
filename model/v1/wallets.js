const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const walletsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  walletAddress: {
    type: String,
    required: true
  },
  walletType: {
    type: String,
  },
}, {
  timestamps: true
});

const wallets = mongoose.model("wallets", walletsSchema);

module.exports = wallets;