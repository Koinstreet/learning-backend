const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentReplySchema = new Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Reply_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Replies",
    required: true,
  },
  comment: {
      type: String,
      required: true
  }
}, {
  timestamps: true
});

const CommentReply = mongoose.model("CommentReply", CommentReplySchema);

module.exports = CommentReply;