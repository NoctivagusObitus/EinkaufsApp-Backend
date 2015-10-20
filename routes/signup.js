var express = require('express');
var User = require('../models/user');
var router = express.Router();

function validateEmail(email) {
    var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return pattern.test(email);
}

router.get('/', function(req, res) {
  res.render('signup', {
    user: req.user
  });
});

router.post('/', function(req, res) {
    if (!validateEmail(req.body.email)){
      req.flash('error', 'Deine E-Mail Adresse scheint nicht korrekt zu sein.');
      return res.redirect('/signup')
    }
    if (req.body.password != req.body.confirm){
      req.flash('error', 'Passwörter nicht gleich');
      return res.redirect('/signup')
    }
    User.findOne( {username: req.body.username}, function (err, user) {
      if (err) { console.log(err); }
      if (user) {
        req.flash('error', 'Benutzername bereits vergeben.');
        return res.redirect('/signup')
      }
        User.findOne( {email: req.body.email}, function (err, user) {
          if (err) { console.log(err); }
          if (user) {
            req.flash('error', 'E-Mail bereits vergeben.');
            return res.redirect('/signup')
        }
            var user = new User({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password
            });

          user.save(function(err) {
              req.logIn(user, function(err) {
              res.redirect('/Inside');
            });
          });
        });
    });
});

router.post('/app', function(req, res) {
    if (!validateEmail(req.body.email)){
      req.flash('error', 'Deine E-Mail Adresse scheint nicht korrekt zu sein.');
      return res.send({status: 'error', message: 'Deine E-Mail Adresse scheint nicht korrekt zu sein.'});
    }
    if (req.body.password != req.body.confirm){
      req.flash('error', 'Passwörter nicht gleich');
      return res.send({status: 'error', message: 'Passwörter nicht gleich'});
    }
    User.findOne( {username: req.body.username}, function (err, user) {
      if (err) { console.log(err); }
      if (user) {
        req.flash('error', 'Benutzername bereits vergeben.');
        return res.send({status: 'error', message: 'Benutzername bereits vergeben.'});
      }
        User.findOne( {email: req.body.email}, function (err, user) {
          if (err) { console.log(err); }
          if (user) {
            req.flash('error', 'E-Mail bereits vergeben.');
            return res.send({status: 'error', message: 'E-Mail bereits vergeben.'});
        }
            var user = new User({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password
            });

          user.save(function(err) {
              req.logIn(user, function(err) {
              res.send({status: 'ok'});
            });
          });
        });
    });
});

module.exports = router;