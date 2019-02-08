// const path = require('path')
// const rootDir = require('../util/path')
const Products = require('../models/product')
const Cart = require('../models/cart')
// const products = []


exports.getProducts = (req, res, next) => {
  Products.fetchAll()
    .then(([rows, filedData]) => {
      res.render('shop/product-list', {
        prods: rows, 
        pageTitle: 'All Product', 
        path: '/products'
      })
    })
    .catch(err => console.log('err : ', err))
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Products.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  })
}

exports.getIndex = (req, res, next) => {
  Products.fetchAll()
    .then(([rows, filedData]) => {
      res.render('shop/index', {
        prods: rows, 
        pageTitle: 'Shop', 
        path: '/'
      })
    })
    .catch(err => console.log('err : ', err))
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Products.fetchAll(products => {
      const cartProducts = []
      for( product of products) {
        const cartProductData = cart.products.find(prod =>  prod.id === product.id)
        if(cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty})
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      })
    })
  })
}

exports.postCart = (req, res, next) => {
  const prodId =  req.body.productId
  // console.log('TCL: exports.postCart -> prodId', prodId)
  Products.findById(prodId, (product) => {
		// console.log('TCL: exports.postCart -> prodId', prodId)
		// console.log('TCL: exports.postCart -> product', product)
    Cart.addProduct(prodId, product.price)
  })
  res.redirect('/cart')
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