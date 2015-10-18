var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');

var configDB = require('./conf/database.js');
var configPassport = require('./conf/passport.js');

var routes = require('./routes/index');
var users = require('./routes/user');
var artikel = require('./routes/article');
var apidoc = require('./routes/api_doc');
var cost = require('./routes/cost');
var group = require('./routes/group');
var offer = require('./routes/offer');
var purchase = require('./routes/purchase');
var store = require('./routes/store');
var login = require('./routes/login');
var logout = require('./routes/logout');
var inside = require('./routes/inside');
var signup = require('./routes/signup');
var forgot = require('./routes/forgot');
var reset = require('./routes/reset');


mongoose.connect(configDB.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: '$tr3ngG3h3!m' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/user', users);
app.use('/article', artikel);
app.use('/cost', cost);
app.use('/group', group);
app.use('/offer', offer);
app.use('/purchase', purchase);
app.use('/store', store);
app.use('/apidoc', apidoc);
app.use('/login', login);
app.use('/logout', logout);
app.use('/inside', inside);
app.use('/signup', signup);
app.use('/forgot', forgot);
app.use('/reset', reset);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
