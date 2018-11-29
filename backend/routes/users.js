var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var Match = require('../models/match');
var Question = require('../models/question');
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

router.post('/stopwaiting', function(req, res) {
    var username = req.body.usr;
    User.update({'username': username}, {$set:{status: "online"}}, function(err, user) {
        if (err) {
            console.log("user exit waiting error");
        }
    });
    return res.send({
        success: true,
        status: 200
    });
})

router.post('/waiting', function(req, res) {
    var username = req.body.usr;
    User.update({'username': username}, {$set:{status: "waiting"}}, function(err, user) {
        if (err) {
            console.log("user waiting error");
        }
    });
    return res.send({
        success: true,
        status: 200
    });
})

router.get('/question', function(req, res, next) {
    Question.countDocuments().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);

        Question.findOne().skip(random).exec(
            function(err, question) {
                return res.send(JSON.stringify(question));
            }
        )
    })
});

router.post('/auth', function(req, res) {
    let username = req.body.usr;
    console.log(username);

    User.find({'username': username}, function(err, user) {
        if (err) {
            console.log("logout error");
            return done(err);
        }
        if (user.length != 0) {
            Token.remove({'username': username}, function(err, result) {
                if (err) {
                    console.log("token error");
                }
            });
            User.update({'username': username}, {$set:{status: "offline"}}, function(err, user) {
                if (err) {
                    console.log("user status error");
                }
            });
            return res.send({
                success: true,
                status: 200
            });
        }
        else if (user.length == 0) {
            return res.send({
                success: false,
                status: 500
            });
        }
    })
});

router.post('/', function(req, res) {
    let username = req.body.usr;
    let password = req.body.pass;
    console.log(username + " " + password);

    User.find({'username': username, 'password': password}, function(err, user) {
        if (err) {
            console.log("signup error");
            return done(err);
        }
        if (user.length != 0) {
            console.log("username is already taken");
            return res.send({
                success: false,
                status: 500
            });
        }
        else if (user.length == 0) {
            console.log("user created successfully");

            var newUser = new User({
                username: username,
                password: password
            });

            User.createUser(newUser, function(err, user) {
                if (err) throw err;
                console.log(user);
            });
            return res.send({
                success: true,
                status: 200
            });
        }
    })
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

            User.update({'username': username}, {$set:{status: "online"}}, function(err, user) {
                if (err) {
                    console.log("user status error");
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
