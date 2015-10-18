var express = require('express');
var async = require('async');
var crypto = require('crypto');
var User = require('../models/user');
var nodemailer = require('nodemailer');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('forgot', {
    user: req.user
  });
});

router.post('/', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'Es existiert kein Account mit dieser E-Mail Adresse.');
          return res.redirect('/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Token ist eine Stunde gültig

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport();      
      var mailOptions = {
        to: user.email,
        from: 'no-reply@EinkaufsApp.com',
        subject: 'Passwort ändern',
        text: 'Diese Mail wurde generiert, weil jemand eine Passwort-Rücksetzung beantragt hat.\n\n' +
          'Bitte klicke auf den nachfolgenden Link um dein Passwort zu erneuern:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'Wenn du diese Änderung nicht beauftragt hast, ignoriere diese Mail und dein Passwort bleibt unverändert.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'Eine E-Mail mit weiteren Informationen wurde an ' + user.email + ' gesendet.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

module.exports= router;