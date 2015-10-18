var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var ArticleCosts = require('../models/article_costs');

router.get('/', auth, function(req, res, next){
    Article.find(function(err, artikel){
        res.send(artikel);
    });
});

router.post('/add', auth, function(req, res, next){
    var new_artikel = new Article({name: req.body.name, ean: req.body.ean});
    new_artikel.save(function(err){
        console.log(err);
    });
    res.send("k");
});

router.post('/delete/:id', auth, function(req, res, next){
    Article.remove({_id: req.params.id }, function(err){
        console.log(err);
        res.send("k");
    });
});

router.post('/:id', auth, function(req, res, next){
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
        article.ean = req.article.ean;    
        article.save(function (err){
            if (err) {
                console.log(err);
                res.send(err);
            }
        });
    });
});

router.get('/bystore/:id', auth, function(req, res, next){
    var storeid = req.params.id;
    ArticleCosts.find({store_id: storeid}, function (err, elements){
        var articles = [];
        for(var i = 0; i < elements.length; i++){
            articles[i] = elements[i]._id;
        }
        Article.findByIds(articles, function (err, response){
            res.send(response);
        });
    });
});

module.exports= router;
