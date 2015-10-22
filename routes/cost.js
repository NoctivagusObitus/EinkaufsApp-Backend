var express = require('express');
var router = express.Router();
var Cost = require('../models/cost');
var auth = require('../conf/auth.js');


router.get('/', auth, function (req, res, next){
    Cost.find(function (err, costs){
        res.send(costs);
    });
});

router.get('/:id', auth, function (req, res, next){
    Cost.findbyid(req.params.id, function(err, costs){
        res.send(costs);
    });
});





module.exports = router;