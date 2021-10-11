const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ChildLinkSchema = new Schema({
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SidebarMenu",
    },
    name: {
        type: String
    },
    url: {
        type: String
    },
    comingSoon: {
        type: Boolean
    },
    dashboard: {
        type: String
    },
    mentorship: {
        type: String
    },
    careers: {
        type: String
    },
    create: {
        type: String
    },
    account: {
        type: String
    },
    help: {
        type: String
    },
    manage: {
        type: String
    }

}, { timestamps: true })





const ChildLink = mongoose.model('ChildLink', ChildLinkSchema);

module.exports = ChildLink