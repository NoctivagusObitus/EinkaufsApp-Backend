var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    title: 'Public',
    user: req.user
  });
});

module.exports = router;