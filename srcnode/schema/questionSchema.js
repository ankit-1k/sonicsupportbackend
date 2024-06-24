const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    subject: String,
    question: String,
    answer: String
});

const QuestionModel = mongoose.model('Question', QuestionSchema);

module.exports = QuestionModel;
