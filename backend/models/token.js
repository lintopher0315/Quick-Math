var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/customers', { useNewUrlParser: true} );

var dbt = mongoose.connection;

var TokenSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    status: {
        type: Boolean
    }
});

var Token = module.exports = mongoose.model('Token', TokenSchema);

module.exports.createToken = function(newToken, callback) {
    newToken.save(callback);
}
