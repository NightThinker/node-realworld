// const path = require('path')
// const rootDir = require('../util/path')
const Products = require('../models/product')
const Cart = require('../models/cart')
// const products = []


exports.getProducts = (req, res, next) => {
  Products.findAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products, 
      pageTitle: 'All Product', 
      path: '/products'
    })
  })
  .catch(err => console.log('err : ', err))
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Products.findAll({where: {id: prodId}})
    .then(products => {
      res.render('shop/product-detail', {
        product: products[0],
        pageTitle: products[0].title,
        path: '/products'
      })
    })
    .catch(err => console.log(err))
    // ---- or -----
  // Products.findById(prodId)
  //   .then(product => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       pageTitle: product.title,
  //       path: '/products'
  //     })
  //   })
  //   .catch(err => console.log('err : ', err))
}

exports.getIndex = (req, res, next) => {
  Products.findAll()
  .then(products => {
    res.render('shop/index', {
      prods: products, 
      pageTitle: 'Shop', 
      path: '/'
    })
  })
  .catch(err => console.log('err : ', err))
}

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(product => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: product
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
  const prodId =  req.body.productId
  let fetchedCart
  let newQuantity = 1
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart
      return cart
        .getProducts({where: {id: prodId}})
        .then(products => {
          let product
          if(products.length > 0) {
            product = products[0]
          }
          
          if(product) {
            const oldQuantity = product.cartItem.quantity
            newQuantity = oldQuantity + 1
            return product
          }
          return Products.findById(prodId)
        })
        .then(product => {
          return fetchedCart.addProduct(product, { 
            through: { quantity: newQuantity } 
          })
        })
        .then(() => {
          res.redirect('/cart')
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

exports.postCartDeleteProduct =(req, res, next) => {
  const prodId = req.body.productId
  Products.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}