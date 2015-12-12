var User = require('../models/user');


// Prüft mittels Passport Funktion isAuthenticated() ob der User authentifiziert ist. Siehe:
// https://github.com/jaredhanson/passport/blob/a892b9dc54dce34b7170ad5d73d8ccfba87f4fcf/lib/passport/http/request.js#L74
module.exports = function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        var tenmin = 600000;
        req.session.lastAccess = new Date(Date.now() + tenmin);
        return next();
    }
    req.flash('error', 'Keine Berechtigung für diese Route. Bitte einloggen.');
    res.redirect('/login');
}