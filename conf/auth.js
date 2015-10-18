module.exports = function isAuthenticated(req, res, next) {
  if (req.user == null){
    req.flash('error', 'Keine Berechtigung für diese Route. Bitte einloggen.');
    return res.redirect('/login')
  }
  return next();
}