var express = require('express');
var User = require('../models/user');
var async = require('async');
var nodemailer = require('nodemailer');
var router = express.Router();

function validatePassword(pw){
  // min. ein kleiner und ein großer Buchstabe sowie eine Zahl, min. 6 Zeichen lang
  var pattern2 = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  return pattern2.test(pw);
}

router.get('/:token', function(req, res) {
  // Es wird geprüft ob es das angegebene Token gibt und ob es noch nicht abgelaufen ist
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password-Reset-Token ungültig oder abgelaufen.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      user: req.user
    });
  });
});

router.post('/:token', function(req, res) {
  async.waterfall([
    function(done) {
      // schaut ob es einen User mit diesem Token gibt und ob die Zeit noch nicht abgelaufen ist
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password-Reset-Token ungültig oder abgelaufen.');
          return res.redirect('back');
        }
        if (!validatePassword(req.body.password)){
          req.flash('error', 'Dein Passwort muss kleine und große Buchstaben sowie Zahlen beinhalten und mindestens 6 Zeichen lang sein  ');
          var pw = '';
          var cpw = '';
        }else{
            if (req.body.password != req.body.confirm){
              req.flash('error', 'Passwörter nicht gleich  ');
              var pw = '';
              var cpw = '';
            }else{
              var pw = req.body.password;   
              var cpw = req.body.confirm;
            } 
        }
        // Passwort reset war erfolgreich - Token und Zeit werden gelöscht
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      // Info an den User per Mail, dass Passwort geändert wurde
      var smtpTransport = nodemailer.createTransport();      
      var mailOptions = {
        to: user.email,
        from: 'no-reply@EinkaufsApp.com',
        subject: 'Dein Passwort wurde geändert.',
        text: 'Hallo,\n\n' +
          'dies ist eine Bestätigung, dass das Passwort für den Account ' + user.email + ' geändert wurde.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Das Passwort wurde erfolgreich geändert.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});

module.exports = router;