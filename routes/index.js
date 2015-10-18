var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EinkaufsApp Backend' });
});

router.post('/login', function(req, res, next){

});

router.post('/register', function(req, res, next){

});
module.exports = router;
