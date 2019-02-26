const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const errorControllers = require('./controllers/error')
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://may:5221043005@cluster0-rnstb.mongodb.net/shop'


const app = express()
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

app.set('view engine', 'ejs')
app.set('views', 'views')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}))

app.use((req, res, next) => {
  User.findById('5c74e6d0f7519823f6692b5c')
    .then(user => {
      // req.user = user
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

app.use(errorControllers.get404)

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    User
      .findOne()
      .then(user => {
        if(!user) {
          const user = new User({
            name: 'May',
            email: 'may@test.com',
            cart: {
              items: []
            }
          })
          user.save()
        }
      })
      // .catch(err => console.log(err))
    app.listen(3000)
  })
  .catch(err=> {
    console.log(err)
  })