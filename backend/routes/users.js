var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var User = require('../models/user');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.send("users");
});

router.get('/check', function(req, res, next) {
  //res.send('respond with a resource');
    res.send("/check");
});

router.post('/', function(req, res) {
    let username = req.body.usr;
    let password = req.body.pass;
    console.log(username + " " + password);

    var newUser = new User({
        username: username,
        password: password
    });

    User.createUser(newUser, function(err, user) {
        if (err) throw err;
        console.log(user);
    });


});

router.post('/check', function(req, res) {
    let username = req.body.usr;
    let password = req.body.pass;

    User.find({'username': username, 'password': password}, function(err, user) {
        if (err) {
            console.log("login error");
            return done(err);
        }
        if (user.length != 0) {
            console.log("username exists, login successful");
        }
    })
});

module.exports = router;
