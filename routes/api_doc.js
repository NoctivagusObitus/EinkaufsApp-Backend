var express = require('express');
var router = express.Router();


router.get('/', auth, function (req, res, next){
    res.render('api_index');
});

module.exports = router;