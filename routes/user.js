var express = require('express');
var router = express.Router();
var User = require('../models/user');
var auth = require('../conf/auth.js');

router.get('/', auth, function (req, res, next){
    User.find(function (err, users){
        res.send(users);
    });
});

router.get('/:id', auth, function (req, res, next){
    User.findbyid(req.params.id, function(err, users){
        res.send(users);
    });
});

router.get('/name/:name', auth, function( req, res, next){
    User.find({username: name}, function(err, user){
        res.send(user);
    });
});

module.exports = router;