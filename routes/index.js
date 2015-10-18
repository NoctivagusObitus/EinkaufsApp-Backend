var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    title: 'Outside',
    user: req.user
  });
});

module.exports = router;