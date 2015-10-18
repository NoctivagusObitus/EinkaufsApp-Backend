var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login', {
    user: req.user
  });
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)
    if (!user) {
      req.flash('error', 'Login fehlgeschlagen');
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      if (err) {
        req.flash('error', 'Login fehlgeschlagen - PW');
        return next(err);
      }
      req.flash('success', 'Login erfolgreich');
      return res.redirect('/Inside');
    });
  })(req, res, next);
});

module.exports = router;