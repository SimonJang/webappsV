/**
 * Schema voor quiz
 */

var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
    naam: String,
    landen: [{type: mongoose.Schema.Types.ObjectId, ref: 'Land'}]
});

mongoose.model('Quiz', QuizSchema);

