var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tokens', { useNewUrlParser: true} );

var db = mongoose.connection;

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
