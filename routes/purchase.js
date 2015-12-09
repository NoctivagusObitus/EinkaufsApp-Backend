var express = require('express');
var router = express.Router();
var Purchase = require('../models/purchase');
var User = require('../models/user');
var Store = require('../models/store');
var Article = require('../models/article');
var ArticleCost = require('../models/article_costs');
var Group = require('../models/group');

var auth = require('../conf/auth.js');

router.get('/', auth, function(req, res, next) {
  Purchase.find(function(err, purchase) {
    res.send(purchase);
  });
});

router.get('/:id', auth, function(req, res, next) {
  Purchase.findbyid(req.params.id, function(err, purchase) {
    res.send(purchase);
  });
});

router.get('/owner/:owner', auth, function(req, res, next) {
  Purchase.find({
    owner_id: req.params.owner
  }, function(err, purchases) {
    res.send(purchases);
  })
});

router.get('/benefitial/:benefitial', auth, function(req, res, next) {
  Purchase.find({
    'cart.benefitial_id': req.params.benefitial
  }, function(err, purchases) {
    res.send(purchases);
  })
});

router.get('/rich/:id', auth, function(req, res, next) {
  var richoutput = {};
  Purchase.findbyId(req.params.id, function(err, purchase) {
    User.findbyId(purchase.owner_id, function(err, user) {
      richoutput.owner = user.name;
      Store.findbyId(purchase.store_id, function(err, store) {
        richoutput.store = store.name;
        richoutput.cart = [];
        for (var i = 0; i < purchase.cart.length; i++) {
          User.findbyId(purchase.cart[i].benefitial_id, function(err, user) {
            richoutput.cart[i].benefitial = user.name;
            Article_store.findbyId(purchase.cart[i].article_store_id, function(err, articlestore) {
              richoutput.cart[i].price = articlestore.costs.price;
              Article.findbyId(articlestore.article_id, function(err, article) {
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


router.post('/add', auth, function(req, res, next) {
  console.log(req.body);
  console.log(req.body.cart[0]['amount']);
  console.log(req.body.cart[0].amount);
  var cart = req.body.cart;

  for (var i = 0; i <  req.body.cart.length; i++) {
    var article = req.body.cart[i]["article_costs"]["article"];
    var cart2 = [];

    Article.find({ean: article.ean}, function(err, article) {
      var articleid;
      var articlecostsid;
      console.log(err, article);

      if (err || article.length == 0) {
        var newarticle = new Article(article);
        newarticle.save(function(err, art) {
          if (err) console.log(err);
          else articleid = art._id;
        });
      } else {
        articleid = article._id;
      }
        ArticleCost.find({store_id: req.body.store_id, article_id: articleid}, function(err, entity) {
          if(err){
            var newentity = new ArticleCost({
              store_id: req.body.cart[i].article_costs.store_id,
              article_id: article._id,
              costs: req.body.cart[i].article_costs.costs,
              offer: req.body.cart[i].article_costs.offer
            });
            newentity.save(function(err, ent) {
              if (err) console.log(err);
              else articelcostsid = ent._id;
            });
          } else articlecostsid = entity._id;
          cart2.push({article_store_id: articlecostsid, amount: req.body.cart[i].amount, benefitial_id: '0' });
        });
    });
  }
 console.log(cart);
  var purchase = new Purchase({store_id: req.body.store_id, owner_id: req.body.owner_id, date: req.body.date, cart: cart })
 console.log(purchase);
/*
  var purchase = new Purchase({
    date: req.body.date,
    buyer_user: req.body.buyer_user,
    benefitial_user: req.body.benefitial_user,
    benefitial_group: req.body.benefitial_group,
    purchased_articles: req.body.purchased_articles
  });*/
  purchase.save(function(err) {
    if (err) res.send({
      status: "error",
      message: err
    });
    else res.send({
      status: "ok"
    });
  });
});

router.post('/edit/:id', auth, function(req, res, next) {
  Purchase.findbyId(req.params.id, function(err, purchase) {
    if (err) {
      console.log(err);
      res.send(err);
    } else res.send("k");
    purchase.date = req.body.date;
    purchase.buyer_user = req.article.buyer_user;
    purchase.benefitial_user = req.body.benefitial_user;
    purchase.benefitial_group = req.body.benefitial_group;
    purchase.purchased_articles = req.body.purchased_articles;
    purchase.save(function(err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else res.send("k");
    });
  });
});

router.post('/delete/:id', auth, function(req, res, next) {
  Purchase.remove({
    _id: req.params.id
  }, function(err) {
    console.log(err);
    res.send("k");
  });
});

module.exports = router;
