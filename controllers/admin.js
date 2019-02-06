const Products = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  res.render('admin/edit-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product', 
    editing: false
  })
}

exports.postAddProduct = (req, res,next) => {
  console.log('body : ', req.body)
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  // products.push({title: req.body.title})
  const product = new Products(null, title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if(!editMode) {
    res.redirect('/')
  }
  const prodId = req.params.productId
  Products.findById(prodId, product => {
    if(!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product', 
      editing: editMode,
      product: product
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedImageUrl = req.body.imageUrl
  const updatedDescription = req.body.description
  const updatedPrice = req.body.price
  // products.push({title: req.body.title})
  const updatedProduct = new Products(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/products')
}



exports.getProducts = (req, res, next) => {
  Products.fetchAll( products => {
    res.render('admin/products', {
      prods: products, 
      pageTitle: 'Admin Products', 
      path: 'admin/products'
    })
  })
}