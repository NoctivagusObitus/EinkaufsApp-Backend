var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// User Schema mit entsprechenden Einträgen (required = nicht leer, unique = einmalig)
var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  css: { type: String },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// Beim speichern des Users wird das Passwort mit bcrypt verschlüsselt
userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;
  
  //Passwort wird nur gehasht wenn es geändert wurde
  if (!user.isModified('password')) return next();    
    
  //generiert einen "SALT" mit welchen dann das Passwort gehasht wird
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {     
    if (err) return next(err);
      
    //hasht das Passwort und schreibt es in die DB
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Vergleicht das eingegebene Passwort und das Passwort in der DB miteinander 
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);