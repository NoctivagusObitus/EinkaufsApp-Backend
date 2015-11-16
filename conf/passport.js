var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


// Initialisiert die Passport Strategie "Local" -> Lokale Datenbank
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {                    //sucht User "username" aus DB
    if (err) return done(err);                                                  //
    if (!user) return done(null, false, { message: 'Incorrect username.' });    //wenn es keinen gibt -> Incorrect username
    user.comparePassword(password, function(err, isMatch) {                     //Vergleicht Passwörter -> Doku siehe User Model
      if (isMatch) {                                                            //Wenn Passwort korrekt -> weiter, ansonsten -> Incorrect password
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));


// Info: http://www.itwissen.info/definition/lexikon/Serialisierung-serialization.html
passport.serializeUser(function(user, done) {
  done(null, user.id);                          //Umwandlung user in userID
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {       //Gegenteilig, die Umwandlung einer userID in einen User
    done(err, user);
  });
});