const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
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
}, {
  timestamps: true
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;