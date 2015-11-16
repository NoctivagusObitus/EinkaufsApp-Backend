var express = require('express');
var router = express.Router();

// ausloggen mit logout Funktion von passport
router.get('/', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;