const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    activityName: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String
    },
    completionRate: {
        type: String
    },
    duration: {
        type: String
    },
    description: {
        type: String
    },
    // quiz: [{type: mongoose.SchemaType.ObjectId, ref: 'Quiz'}]
    quiz: {
        correctAnswer: String,
        question: String,
        answers: [String]
    }
});

const Activity = mongoose.model("Activity", activitySchema); 

module.exports = Activity;