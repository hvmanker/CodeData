const mongoose = require('mongoose');

// Define the schema
const questionSchema = new mongoose.Schema({
    question_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    links: {
        URL1: {
            type: String,
            required: true
        },
        
    },
    category: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    }
});

// Create a model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
