var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login', {
    user: req.user,
    cusername: ''
  });
});

function checkTextField(field) {
     req.flash('error', 'asdcsd fehlgeschlagen');
}

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)
    if (!user) {
      req.flash('error', 'Login fehlgeschlagen');
      return res.render('login', {
        cusername: req.body.username
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        req.flash('error', 'Login fehlgeschlagen');
        return res.render('login', {
          cusername: req.body.username
        });
      }
      req.flash('success', 'Login erfolgreich');
      return res.redirect('/Inside');
    });
  })(req, res, next);
});

// Wir brauchen eine ZWEITE Route für die App, welche uns nur JSON zurückgibt ;)
router.post('/app', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)
    if (!user) {
       return res.send({status: "error", message: 'Login fehlgeschlagen'});
    }
    req.logIn(user, function(err) {
      if (err) {
         return res.send({status: "error", message: 'Login fehlgeschlagen'});
      }
      return res.send({status: "ok"});
    });
  })(req, res, next);
});

module.exports = router;