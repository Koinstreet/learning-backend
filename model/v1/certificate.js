const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    courseId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],

    ipfsURL: { type: String },
}, {
    timestamps: true
});

const Certificate = mongoose.model("Certificate", certificateSchema);

module.exports = Certificate;