const path = require('path')
const express = require('express')

const rootDir = require('../util/path')

const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  console.log("In another Middleware product")
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})

// /admin/product => POST
router.post('/product', (req, res,next) => {
  console.log('body : ', req.body)
  res.redirect('/')
})



module.exports = router