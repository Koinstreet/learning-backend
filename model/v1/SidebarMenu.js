const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const SidebarMenuSchema = new Schema({
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    access: {
        type: String,
        enum: ['PM', 'Admin', 'user']
    },
    title: {
        type: String
    },
    dropdown: {
        type: Boolean
    },
    comingSoon: {
        type: Boolean
    }
}, { timestamps: true })

const SidebarMenu = mongoose.model('SidebarMenu', SidebarMenuSchema);

module.exports = SidebarMenu