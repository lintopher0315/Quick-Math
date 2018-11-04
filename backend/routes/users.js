var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var Token = require('../models/token');
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

            Token.remove({'username': username}, function(err, result) {
                if (err) {
                    console.log("token error");
                }
            });

            var newToken = new Token({
                username: username,
                status: true
            });

            Token.createToken(newToken, function(err, token) {
                if (err) throw err;
                console.log(token);
            })

            return res.send({
                success: true,
                status: 200
            });
        }
        else if (user.length == 0) {
            console.log("username does not exist, try again");
            return res.send({
                success: false,
                status: 500
            });
        }
    })
});

module.exports = router;
