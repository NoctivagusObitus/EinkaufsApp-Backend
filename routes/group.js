var express = require('express');
var router = express.Router();
var Group = require('../models/group');
var auth = require('../conf/auth.js');

router.get('/', auth, function (req, res, next){
    Group.find(function (err, groups){
        res.send(groups);
    });
});

router.get('/:id', function (req, res, next){
    Group.findbyid(req.params.id, function(err, groups){
        res.send(groups);
    });
});

module.exports = router;