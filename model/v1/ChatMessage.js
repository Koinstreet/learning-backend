const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chat",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: String
  },
  seen: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true
});

const chatMessage = mongoose.model("chatMessage", chatMessageSchema);

module.exports = chatMessage;