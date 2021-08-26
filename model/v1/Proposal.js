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
    startUp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Startup",
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ["Project", "Event", "Startup"]
    },
    stage: {
        type: String,
        enum: ["Unapproved", "Planned", "InProgress", "Completed"],
        default: "Unapproved"
    }
},{
    timestamps: true,
});

const Proposal = mongoose.model("ProposalReplies", proposalSchema);

module.exports = Proposal;