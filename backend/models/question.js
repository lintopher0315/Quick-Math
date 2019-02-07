var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/customers', { useNewUrlParser: true} );

var dbs = mongoose.connection;

var QuestionSchema = mongoose.Schema({
    question: {
        type: String,
        index: true
    },

    answer: {
        type: String,
    }
});

var Question = module.exports = mongoose.model('Question', QuestionSchema);

module.exports.createQuestion = function(newQuestion, callback) {
    newQuestion.save(callback);
}
