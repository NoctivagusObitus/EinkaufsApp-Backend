var express = require('express');
var router = express.Router();
var Store = require('../models/store');


router.get('/', function (req, res, next){
    Store.find(function (err, stores){
        res.send(stores);
    });
});

router.get('/:id', function (req, res, next){
    Store.findbyid(req.params.id, function(err, stores){
        res.send(stores);
    });
});

module.exports = router;