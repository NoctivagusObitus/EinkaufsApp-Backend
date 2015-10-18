var express = require('express');
var router = express.Router();
var Purchase = require('../models/purchase');
var auth = require('../conf/auth.js');

router.get('/', auth, function (req, res, next){
    Purchase.find(function (err, purchase){
        res.send(purchase);
    });
});

router.get('/:id', auth, function (req, res, next){
    Purchase.findbyid(req.params.id, function(err, purchase){
        res.send(purchase);
    });
});

module.exports = router;