var express = require('express');
var router = express.Router();
var Store = require('../models/store');
var auth = require('../conf/auth.js');

router.get('/', auth, function (req, res, next){
    Store.find(function (err, stores){
        res.send(stores);
    });
});

router.get('/:id', auth, function (req, res, next){
    Store.findbyid(req.params.id, function(err, stores){
        res.send(stores);
    });
});

router.post('/add', auth, function (req, res, next){
    var gps = { ln: req.body.ln, lat: req.body.lat};
    var store = new Store({name: req.body.name, gps: gps, country: req.body.country, zip: req.body.zip, street: req.body.street, street_num: req.body.street_num});
    store.save(function(err){
        if(err) res.send({status: "error", message: err});
        else res.send({status: "ok"});
    });
});

router.post('/edit/:id', auth, function(req, res, next){
    Store.findbyId(req.params.id, function (err, store){
        if (err) {
            console.log(err);
            res.send(err);
        } else res.send("k");
        store.name= req.body.name;
        store.gps.ln = req.body.ln;    
        store.gps.lat = req.body.lat;    
        store.country = req.body.country;    
        store.zip = req.body.zip;    
        store.street= req.body.street;   
        store.street_num = req.body.street_num;   
        store.save(function (err){
            if (err) {
                console.log(err);
                res.send(err);
            } else res.send("k");
        });
    });
});

router.post('/delete/:id', auth, function(req, res, next){
    Store.remove({_id: req.params.id }, function(err){
        console.log(err);
        res.send("k");
    });
});


module.exports = router;