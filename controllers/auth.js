
exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.isLoginedIn
  })
}

exports.postLogin = (req, res, next) => {
  req.isLoginedIn = true
  res.redirect('/')
}