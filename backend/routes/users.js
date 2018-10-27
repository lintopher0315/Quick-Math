var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var User = require('../models/user');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    res.send("asdf");
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

module.exports = router;
