const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
