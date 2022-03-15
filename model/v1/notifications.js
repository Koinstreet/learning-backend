const mongoose = require('mongoose');

const NotificationsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
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
    chapter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ["User","Careers","Project", "Event", "Startup", "Chapter", "Course"],
    },
    seen: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
});

const Notifications = mongoose.model("Notifications", NotificationsSchema);

module.exports = Notifications;