var express = require('express');
var auth = require('../conf/auth.js');
var router = express.Router();

router.get('/', auth, function(req, res){  
   res.render('inside', {
    title: 'Inside',
    user: req.user,
  });
});

module.exports = router;