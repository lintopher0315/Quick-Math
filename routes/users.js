var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var Statistic = require('../models/statistic');
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

router.post('/displaypractice', function(req, res) {
    var username = req.body.usr;

    Statistic.find({username: username, mode: 'practice'}).exec(
        function(err, statistic) {
            return res.send(JSON.stringify(statistic));
        }
    )
})

router.post('/displayplay', function(req, res) {
    var username = req.body.usr;

    Statistic.find({username: username, mode: 'play'}).exec(
        function(err, statistic) {
            return res.send(JSON.stringify(statistic));
        }
    )
})

router.post('/playstatistic', function(req, res) {
    var username = req.body.usr;
    var score = req.body.score;
    var time = req.body.time;
    var date = new Date();

    var newStatistic = new Statistic({
        username: username,
        mode: 'play',
        date: date,
        score: score,
        time: time,
    });

    Statistic.createStatistic(newStatistic, function(err, statistic) {
        if (err) throw err;
        console.log(statistic);
    })

    return res.send({
        success: true,
        status: 200,
    })
})

router.post('/practicestatistic', function(req, res) {
    var username = req.body.usr;
    var score = req.body.score;
    var time = req.body.time;
    var date = new Date();

    var newStatistic = new Statistic({
        username: username,
        mode: 'practice',
        date: date,
        score: score,
        time: time,
    });

    Statistic.createStatistic(newStatistic, function(err, statistic) {
        if (err) throw err;
        console.log(statistic);
    })

    return res.send({
        success: true,
        status: 200,
    });
})

router.get('/check', function(req, res, next) {
  //res.send('respond with a resource');
    res.send("/check");
});

router.post('/userfinish', function(req, res) {
    var username = req.body.usr;
    var opponent = req.body.opponent;

    var done = true;

    User.findOne({'username': username}, function(err, user) {
        if (user.toObject().status !== "online") {
            done = false;
        }
    })
    User.findOne({'username': opponent}, function(err, user) {
        if (user.toObject().status !== "online") {
            done = false;
        }
    })
    return res.send({
        success: done,
        status: 200,
    })
})

router.post('/removematch', function(req, res) {
    var username = req.body.usr;
    Match.remove({'username1': username}, function(err, result) {
        if (err) {
            console.log("remove match error");
        }
        return res.send({
            success: true,
            status: 200,
        })
    })
})

router.post('/exitmatch', function(req, res) {
    var username = req.body.usr;
    User.update({'username': username}, {$set:{status: "online"}}, function(err, user) {
        if (err) {
            console.log("exit status set error");
        }
        return res.send({
            success: true,
            status: 200,
        })
    })
})

router.post('/incrementround', function(req, res) {
    var username = req.body.usr;
    var order = req.body.order;
    var round = req.body.round;

    if (order === "first") {
        Match.update({'username1': username}, {$set:{'question1': round}}, function(err, match) {
            if (err) {
                console.log("increment round error");
            }
            return res.send({
                success: true,
                status: 200,
            });
        })
    }
    else if (order === "second") {
        Match.update({'username2': username}, {$set:{'question2': round}}, function(err, match) {
            if (err) {
                console.log("increment round error");
            }
            return res.send({
                success: true,
                status: 200,
            });
        })
    }
})

router.post('/opponentscore', function(req, res) {
    var username = req.body.usr;
    var order = req.body.order;

    if (order === "first") {
        Match.find({'username1': username}, function(err, match) {
            if (err) {
                console.log("opponent score error");
            }
            return res.send(JSON.stringify(match));
        })
    }
    else if (order === "second") {
        Match.find({'username2': username}, function(err, match) {
            if (err) {
                console.log("opponent score error");
            }
            return res.send(JSON.stringify(match));
        })
    }
})

router.post('/updatescore', function(req, res) {
    var username = req.body.usr;
    var order = req.body.order;
    var score = req.body.score;

    if (order === "first") {
        Match.update({'username1': username}, {$set:{'score1': score}}, function(err, user) {
            if (err) {
                console.log("score update error");
            }
            return res.send({
                success: true,
                status: 200,
            });
        });
    }
    else if (order === "second") {
        Match.update({'username2': username}, {$set:{'score2': score}}, function(err, user) {
            if (err) {
                console.log("score update error");
            }
            return res.send({
                success: true,
                status: 200,
            });
        });
    }
})

router.post('/getopponent', function(req, res) {
    var username = req.body.usr;
    var order = req.body.order;
    if (order === "first") {
        Match.find({'username1': username}, function(err, match) {
            if (err) {
                console.log("opponent user error");
            }
            return res.send(JSON.stringify(match));
        })
    }
    else if (order === "second") {
        Match.find({'username2': username}, function(err, match) {
            if (err) {
                console.log("opponent user error");
            }
            return res.send(JSON.stringify(match));
        })
    }
})

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

router.post('/ingame', function(req, res) {
    var username = req.body.usr;
    User.find({'username': username, status: 'ingame'}, function(err, user) {
        console.log(user.length);
        if (err) {
            console.log("first player error");
        }
        if (user.length == 0) {
            return res.send({
                success: false,
                status: 200,
            })
        }
        else {
            return res.send({
                success: true,
                status: 500
            });
        }
    })
})

router.post('/waiting', function(req, res) {
    var username = req.body.usr;
    User.update({'username': username}, {$set:{status: "waiting"}}, function(err, user) {
        if (err) {
            console.log("user waiting error");
        }
    });
    User.findOneAndUpdate({status: "waiting"}, {$set:{status: "ingame"}}, function(err, doc) {
        if (err) {
            console.log("waiting error");
        }
        if (doc != null) {
            User.update({'username': username}, {$set:{status: "ingame"}}, function(err, user) {
                if (err) {
                    console.log("user waiting error2");
                }
                var newMatch = new Match({
                    username1: doc.toObject().username,
                    username2: username,
                    score1: 0,
                    score2: 0,
                    question1: 1,
                    question2: 1,
                });
                Match.createMatch(newMatch, function(err, match) {
                    if (err) throw err;
                    console.log(match);
                })
            });
            return res.send({
                success: true,
                status: 200,
                order: "second",
            });
        }
        else {
            return res.send({
                success: true,
                status: 200,
                order: "first",
            });
        }
    })
})

/*router.get('/question', function(req, res, next) {
    Question.countDocuments().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);

        Question.findOne().skip(random).exec(
            function(err, question) {
                return res.send(JSON.stringify(question));
            }
        )
    })
});*/

router.post('/question', function(req, res) {
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
