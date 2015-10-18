var User = require('../models/user');

module.exports = function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('error', 'Keine Berechtigung für diese Route. Bitte einloggen.');
    res.redirect('/login');
}