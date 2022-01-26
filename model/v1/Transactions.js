const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    hash: {
      type: String
    },
    userAddress: {
      type: String
    },
    metadata: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Transactions = mongoose.model("Transactions", TransactionsSchema);

module.exports = Transactions;
