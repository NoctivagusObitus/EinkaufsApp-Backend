var express = require('express');
var router = express.Router();
var Offer = require('../models/offer');


router.get('/', function (req, res, next){
    Offer.find(function (err, offers){
        res.send(offers);
    });
});

router.get('/:id', function (req, res, next){
    Offer.findbyid(req.params.id, function(err, offers){
        res.send(offers);
    });
});




module.exports = router;