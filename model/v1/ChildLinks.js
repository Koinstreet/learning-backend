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
        ref: "Menu",
    },
    name: {
        type: String
    },
    url: {
        type: String
    },
    comingSoon: {
        type: Boolean
    }

}, { timestamps: true })





const ChildLink = mongoose.model('Link', ChildLinkSchema);

module.exports = ChildLink