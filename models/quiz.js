/**
 * Schema voor quiz
 */

var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
    naam: String,
    id: Number,
    omschrijving: String,
    landen: Array
}, {collection: 'quizs'});

mongoose.model('Quiz', QuizSchema);

module.exports = mongoose;

