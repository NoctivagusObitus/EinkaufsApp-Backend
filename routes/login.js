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
     req.flash('error', 'Login fehlgeschlagen 2');
}

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err)
    if (!user) {
      // User mit dem man sich einloggen will existiert nicht
      req.flash('error', 'Login fehlgeschlagen');
      return res.render('login', {
        cusername: req.body.username
      });
    }
    //Login Funktion von Passport
    req.logIn(user, function(err) {
      // Login schlägt fehl - Passwort incorrekt
      if (err) {
        req.flash('error', 'Login fehlgeschlagen');
        return res.render('login', {
          cusername: req.body.username
        });
      }
      
      //Login erfolgreich
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