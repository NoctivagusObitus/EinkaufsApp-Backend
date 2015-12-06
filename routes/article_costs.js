var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var ArticleCosts = require('../models/article_costs');
var auth = require('../conf/auth.js');

router.get('/', auth, function(req, res, next){
    ArticleCosts.find(function(err, artikel){
        res.send(artikel);
    });
});

router.post('/add', auth, function(req, res, next){
//This function gets its shit rich.
  var costs = req.body.costs;
  var offers = req.body.offer;
  var store = req.body.storeid;
  var article = req.body.articleid;

  var new_articlecost = new ArticleCosts({article_id: article._id, store_id: store, costs: costs, offer: offers});
  new_articlecost.save(function(err){
    console.log(err);
  });
  res.send("k");
});

router.post('/product/:productid', auth, function(req, res, next){
  var productid = req.params.productid;
  var storeid = req.body.storeid;

  ArticleCosts.find({article_id: productid, store_id: storeid}, function(entities){
    res.send(entities);
  });
});

router.post('/delete/:id', auth, function(req, res, next){
    Article.remove({_id: req.params.id }, function(err){
        console.log(err);
        res.send("k");
    });
});

router.get('/:id', auth, function(req, res, next){
    Article.findById(req.params.id, function(err, articles){
        res.send(articles);
    });
});


router.post('/edit/:id', auth, function(req, res, next){
    Article.findbyId(req.params.id, function (err, article){
        if (err) {
            console.log(err);
            res.send(err);
        }
        article.name = req.body.name;
        article.ean = req.body.ean;
        article.save(function (err){
            if (err) {
                console.log(err);
                res.send(err);
            }
        });
    });
});
