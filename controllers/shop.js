// const path = require('path')
// const rootDir = require('../util/path')
const Products = require('../models/product')
// const products = []


exports.getProduct = (req, res, next) => {
  // console.log('admin data  products :', adminData.products)
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  // const products = adminData.products
  Products.fetchAll( products => {
    res.render('shop/product-list', {
      prods: products, 
      pageTitle: 'All Product', 
      path: '/products'
    })
  })
}

exports.getIndex = (req, res, next) => {
  Products.fetchAll( products => {
    res.render('shop/index', {
      prods: products, 
      pageTitle: 'Shop', 
      path: '/'
    })
  })
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}