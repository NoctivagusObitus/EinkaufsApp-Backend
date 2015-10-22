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

router.post('/add', auth, function (req, res, next){
    var purchase = new Purchase({date: req.body.date, buyer_user: req.body.buyer_user, benefitial_user: req.body.benefitial_user, benefitial_group: req.body.benefitial_group, purchased_articles: req.body.purchased_articles});
    purchase.save(function(err){
        if(err) res.send({status: "error", message: err});
        else res.send({status: "ok"});
    });
});

router.post('/edit/:id', auth, function(req, res, next){
    Purchase.findbyId(req.params.id, function (err, purchase){
        if (err) {
            console.log(err);
            res.send(err);
        } else res.send("k");
        purchase.date= req.body.date;
        purchase.buyer_user = req.article.buyer_user;    
        purchase.benefitial_user = req.body.benefitial_user;    
        purchase.benefitial_group = req.body.benefitial_group;    
        purchase.purchased_articles = req.body.purchased_articles;    
        purchase.save(function (err){
            if (err) {
                console.log(err);
                res.send(err);
            } else res.send("k");
        });
    });
});

module.exports = router;