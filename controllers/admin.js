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
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      userId: req.user.id
    })
    .then(result => {
      // console.log('result: ', result)
      console.log('created Product')
      res.redirect('/admin/products')
    })
    .catch(err => console.log('err: ', err))
  
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if(!editMode) {
    res.redirect('/')
  }
  const prodId = req.params.productId
  Products.findById(prodId)
    .then(product => {
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
    .catch(err => console.log(err))
  // Products.findById(prodId, product => {
  //   if(!product) {
  //     return res.redirect('/')
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product', 
  //     path: '/admin/edit-product', 
  //     editing: editMode,
  //     product: product
  //   })
  // })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedImageUrl = req.body.imageUrl
  const updatedDescription = req.body.description
  const updatedPrice = req.body.price
  Products.findById(prodId)
    .then(product => {
      product.title = updatedTitle
      product.price = updatedPrice
      product.imageUrl = updatedImageUrl
      product.description = updatedDescription
      return product.save()
    })
    .then(result => {
      console.log('Update Product')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}



exports.getProducts = (req, res, next) => {
  Products.findAll()
  .then(products => {
    res.render('admin/products', {
      prods: products, 
      pageTitle: 'Admin Products', 
      path: 'admin/products'
    })
  })
  .catch(err => console.log('err : ', err))
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Products.findById(prodId)
    .then(product => {
      return product.destroy()
    })
    .then(result => {
      console.log('Delete Product')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}