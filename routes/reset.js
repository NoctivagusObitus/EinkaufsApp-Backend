var express = require('express');
var User = require('../models/user');
var async = require('async');
var nodemailer = require('nodemailer');
var router = express.Router();

router.get('/:token', function(req, res) {
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
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password-Reset-Token ungültig oder abgelaufen.');
          return res.redirect('back');
        }
        if (req.body.password != req.body.confirm){
          req.flash('error', 'Passwörter nicht gleich');
          return res.redirect('back')
        }
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