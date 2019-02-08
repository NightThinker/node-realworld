const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./util/database')
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

db.execute('SELECT * FROM products')


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)


app.use(errorControllers.get404)

app.listen(3000);