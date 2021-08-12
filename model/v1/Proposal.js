const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    title: {
        type: String
    },
    avatar: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    replies: {
        type: Number
    },
    views: {
        type: Number
    },
    upvotes: {
        type: Number
    },
    downvotes: {
        type: Number
    },
    description: {
        type: String
    },
    type: {
        type: String
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Proposal", proposalSchema);