var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/customers', { useNewUrlParser: true} );

var dbm = mongoose.connection;

var MatchSchema = mongoose.Schema({
    username1: {
        type: String,
        index: true
    },
    username2: {
        type: String,
    },
    score1: {
        type: Number,
    },
    score2: {
        type: Number,
    },
    question1: {
        type: Number,
    },
    question2: {
        type: Number,
    }
});

var Match = module.exports = mongoose.model('Match', MatchSchema);

module.exports.createMatch = function(newMatch, callback) {
    newMatch.save(callback);
}
