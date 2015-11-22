var express = require('express');
var router = express.Router();
var Purchase = require('../models/purchase');
var User = require('../models/user');
var Store = require('../models/store');
var Article = require('../models/article');
var Article_store = require('../models/article_costs');
var Group = require('../models/group');

var auth = require('../conf/auth.js');

router.get('/', auth, function (req, res, next) {
    Purchase.find(function (err, purchase) {
        res.send(purchase);
    });
});

router.get('/:id', auth, function (req, res, next) {
    Purchase.findbyid(req.params.id, function (err, purchase) {
        res.send(purchase);
    });
});

router.get('/owner/:owner', auth, function (req, res, next) {
    Purchase.find({
        owner_id: req.params.owner
    }, function (err, purchases) {
        res.send(purchases);
    })
});

router.get('/benefitial/:benefitial', auth, function (req, res, next) {
    Purchase.find({
        'cart.benefitial_id': req.params.benefitial
    }, function (err, purchases) {
        res.send(purchases);
    })
});

router.get('/rich/:id', auth, function (req, res, next) {
    var richoutput = {};
    Purchase.findbyId(req.params.id, function (err, purchase) {
        User.findbyId(purchase.owner_id, function (err, user) {
            richoutput.owner = user.name;
            Store.findbyId(purchase.store_id, function (err, store) {
                richoutput.store = store.name;
                richoutput.cart = [];
                for (var i = 0; i < purchase.cart.length; i++) {
                    User.findbyId(purchase.cart[i].benefitial_id, function (err, user) {
                        richoutput.cart[i].benefitial = user.name;
                        Article_store.findbyId(purchase.cart[i].article_store_id, function (err, articlestore) {
                            richoutput.cart[i].price = articlestore.costs.price;
                            Article.findbyId(articlestore.article_id, function (err, article) {
                                richoutput.cart[i].article = article.name;
                                res.send(richoutput);
                            })
                        });
                    });
                }
            });
        });
    });
});

router.post('/add', auth, function (req, res, next) {
    var purchase = new Purchase({
        date: req.body.date,
        buyer_user: req.body.buyer_user,
        benefitial_user: req.body.benefitial_user,
        benefitial_group: req.body.benefitial_group,
        purchased_articles: req.body.purchased_articles
    });
    Purchase.save(function (err) {
        if (err) res.send({
            status: "error",
            message: err
        });
        else res.send({
            status: "ok"
        });
    });
});

router.post('/edit/:id', auth, function (req, res, next) {
    Purchase.findbyId(req.params.id, function (err, purchase) {
        if (err) {
            console.log(err);
            res.send(err);
        } else res.send("k");
        purchase.date = req.body.date;
        purchase.buyer_user = req.article.buyer_user;
        purchase.benefitial_user = req.body.benefitial_user;
        purchase.benefitial_group = req.body.benefitial_group;
        purchase.purchased_articles = req.body.purchased_articles;
        purchase.save(function (err) {
            if (err) {
                console.log(err);
                res.send(err);
            } else res.send("k");
        });
    });
});

router.post('/delete/:id', auth, function (req, res, next) {
    Purchase.remove({
        _id: req.params.id
    }, function (err) {
        console.log(err);
        res.send("k");
    });
});

module.exports = router;
