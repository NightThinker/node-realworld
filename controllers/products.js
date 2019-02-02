// const path = require('path')
// const rootDir = require('../util/path')

const products = []

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  res.render('add-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product', 
    activeAddProduct: true, 
    formsCSS: true,
    productCSS: true
  })
}

exports.postAddProduct = (req, res,next) => {
  console.log('body : ', req.body)
  products.push({title: req.body.title})
  res.redirect('/')
}

exports.getProduct = (req, res, next) => {
  // console.log('admin data  products :', adminData.products)
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  // const products = adminData.products
  res.render('shop', {
    prods: products, 
    pageTitle: 'Shop', 
    path: '/', 
    hasProducts: products.length > 0, 
    activeShop: true,
    productCSS: true
  })
}