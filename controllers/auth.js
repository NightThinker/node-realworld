
exports.getLogin = (req, res, next) => {
  const isLoginedIn = req.get('Cookie').split('=')[1] === 'true'
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoginedIn
  })
}

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly')
  res.redirect('/')
}