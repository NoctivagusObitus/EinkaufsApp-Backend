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
    var new_entity = new ArticleCosts(req.body);
    new_artikel.save(function(err){
        console.log(err);
    });
    res.send("k");
});

/*
router.post('/delete/:id', auth, function(req, res, next){
    Article.remove({_id: req.params.id }, function(err){
        console.log(err);
        res.send("k");
    });
});

router.get('/:id', auth, function(req, res, next){
    Article.findbyId(req.params.id, function(err, articles){
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
*/
module.exports= router;
