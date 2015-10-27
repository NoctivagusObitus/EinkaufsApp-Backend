var express = require('express');
var User = require('../models/user');
var router = express.Router();

function validateEmail(email) {
    var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return pattern.test(email);
}

router.get('/', function(req, res) {
  res.render('signup', {
    user: '',
    cusername: '',
    cmail: '',
    cpassword: '',
    cpasswordconfirm: ''
  });
});

router.post('/', function(req, res) {
    if (!validateEmail(req.body.email)){
      req.flash('error', 'Deine E-Mail Adresse scheint nicht korrekt zu sein  ');
      //return res.redirect('/signup')
      var emailx = '';
    }else{
      var emailx = req.body.email;   
    }
    if (req.body.password != req.body.confirm){
      req.flash('error', 'Passwörter nicht gleich  ');
      var pw = '';
      var cpw = '';
    }else{
      var pw = req.body.password;   
      var cpw = req.body.confirm;
    }
    User.findOne( {username: req.body.username}, function (err, user) {
      if (err) { console.log(err); }
      if (user) {
        req.flash('error', 'Benutzername bereits vergeben  ');
        var userx = '';
      }else{
        var userx = req.body.username;   
      }
        User.findOne( {email: req.body.email}, function (err, user) {
          if (err) { console.log(err); }
          if (user) {
            req.flash('error', 'E-Mail bereits vergeben  ');
            var email = '';
        }else{
            var email = req.body.email;   
        }
            if (email || pw || cpw || user == ''){
              return res.render('signup', {
                  cusername: userx,
                  cmail: emailx,
                  cpassword: pw,
                  cpasswordconfirm: cpw
              });        
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

module.exports = router;