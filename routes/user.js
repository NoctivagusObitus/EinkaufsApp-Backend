var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next){
    User.find(function (err, users){
        res.send(users);
    });
});

router.get('/:id', function (req, res, next){
    User.findbyid(req.params.id, function(err, users){
        res.send(users);
    });
});

module.exports = router;