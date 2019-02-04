const Products = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  res.render('admin/add-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product', 
    activeAddProduct: true, 
    formsCSS: true,
    productCSS: true
  })
}

exports.postAddProduct = (req, res,next) => {
  console.log('body : ', req.body)
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  // products.push({title: req.body.title})
  const product = new Products(title, imageUrl, description, price)
  product.save()
  res.redirect('/')
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