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
    quiz: {
        correctAnswer: {
            type: String
        },
        question: {
            type: String
        },
        answers: {
            type: [String]
        }
    }
});

const Activity = mongoose.model("Activity", activitySchema); 

module.exports = Activity;