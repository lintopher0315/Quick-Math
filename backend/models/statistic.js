var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/customers', { useNewUrlParser: true} );

var dba = mongoose.connection;

var StatisticSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    date: {
        type: Date,
    },
    score: {
        type: Number,
    },
    time: {
        type: Number,
    }
});

var Statistic = module.exports = mongoose.model('Statistic', StatisticSchema);

module.exports.createStatistic = function(newStatistic, callback) {
    newStatistic.save(callback);
}