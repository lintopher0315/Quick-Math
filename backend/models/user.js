var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/customers', { useNewUrlParser: true} );

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
    },
    status: {
        type: String,
    },
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback) {
    newUser.save(callback);
}
