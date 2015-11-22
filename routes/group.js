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

router.get('/member/:id', function (req, res, next){
    Group.find({'users.user_id': req.params.id}, function(err, groups){
        res.send(groups);
    });
});

router.post('/edit/:id', auth, function(req, res, next){
    Group.findbyId(req.params.id, function (err, group){
        if (err) {
            console.log(err);
            res.send(err);
        }
        group.name = req.body.name;
        group.users = req.body.users;  
        group.save(function (err){
            if (err) {
                console.log(err);
                res.send(err);
            }
        });
    });
});

router.post('/add', auth, function(req, res, next){
    var new_group = new Group({name: req.body.name, users: req.body.users, creator: req.body.creator});
    new_group.save(function(err){
        console.log(err);
    });
    res.send("k");
});

router.post('/delete/:id', auth, function(req, res, next){
    Group.remove({_id: req.params.id }, function(err){
        console.log(err);
        res.send("k");
    });
});

module.exports = router;