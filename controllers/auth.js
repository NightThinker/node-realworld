
exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: true
  })
}

exports.postLogin = (req, res, next) => {
  req.session.isLoginedIn = true
  res.redirect('/')
}