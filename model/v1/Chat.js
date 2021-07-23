const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  accepted: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  blocking_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;