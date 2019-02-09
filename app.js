const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./util/database')
//hbs
// const expressHds = require('express-handlebars')
const errorControllers = require('./controllers/error')

const app = express()

//hbs
// app.engine('hbs', expressHds({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'}))
// app.set('view engine', 'pug')
// app.set('view engine', 'hbs')
app.set('view engine', 'ejs')
app.set('views', 'views')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)


app.use(errorControllers.get404)

sequelize.sync()
  .then(result => {
    // console.log('result : ', result)
    app.listen(3000);
  })
  .catch(err => console.log('err : ', err))