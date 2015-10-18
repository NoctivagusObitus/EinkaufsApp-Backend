var express = require('express');
var router = express.Router();
var Purchase = require('../models/purchase');


router.get('/', function (req, res, next){
    Purchase.find(function (err, purchase){
        res.send(purchase);
    });
});

router.get('/:id', function (req, res, next){
    Purchase.findbyid(req.params.id, function(err, purchase){
        res.send(purchase);
    });
});

module.exports = router;