// const path = require('path')
// const rootDir = require('../util/path')
const Products = require('../models/product')
// const products = []


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
  // products.push({title: req.body.title})
  const product = new Products(req.body.title)
  product.save()
  res.redirect('/')
}

exports.getProduct = (req, res, next) => {
  // console.log('admin data  products :', adminData.products)
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
  // const products = adminData.products
  Products.fetchAll( products => {
    res.render('shop', {
      prods: products, 
      pageTitle: 'Shop', 
      path: '/', 
      hasProducts: products.length > 0, 
      activeShop: true,
      productCSS: true
    })
  })
}