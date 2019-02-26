const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const errorControllers = require('./controllers/error')
const User = require('./models/user')


const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById('5c6199a0a5f15d831fdbd303')
    .then(user => {
      // req.user = user
      req.user = new User(user.name, user.email, user.cart, user._id)
      next()
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorControllers.get404)

mongoose
  .connect('mongodb+srv://may:5221043005@cluster0-rnstb.mongodb.net/test?retryWrites=true')
  .then(result =>{
    app.listen(3000)
  })
  .catch(err=> {
    console.log(err)
  })