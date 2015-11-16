var express = require('express');
var router = express.Router();
var User = require('../models/user');
var auth = require('../conf/auth.js');

// hier wird der Styleswitcher konfiguriert 
// nimmt einen User und eine CSS Datei als Parameter und schreibt die CSS Datei in den User
router.get('/:name/:css', auth, function(req, res, next){
    User.findOne({username: req.params.name}, function(err, user){
        user.css = req.params.css;
        user.save(function(err) {
            if(err) console.log(err)
        });
       return res.redirect('/Inside');
    });
});

module.exports = router;