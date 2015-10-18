var express = require('express');
var router = express.Router();
var Cost = require('../models/cost');


router.get('/', function (req, res, next){
    Cost.find(function (err, costs){
        res.send(costs);
    });
});

router.get('/:id', function (req, res, next){
    Cost.findbyid(req.params.id, function(err, costs){
        res.send(costs);
    });
});




module.exports = router;