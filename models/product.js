const path = require('path')
const fs = require('fs')

// const products = []
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

const getProductFromFile = callback => {
  fs.readFile(p, (err, fileContent) => {
    if(err) {
      callback([])
    } else {
      callback(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    // products.push(this)
    
    getProductFromFile(products => {
      if(this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err)
        })
      }
    })
  }

  static deleteById(id) {
    getProductFromFile(products => {
      const updatedProduct = products.filter(prod => prod.id !== id)
      fs.writeFile(p, JSON.stringify(updatedProduct), err => {
        if(!err) {
          
        }
      })
    })
  }

  static fetchAll(callback) {
    getProductFromFile(callback)
  }

  static findById(id, callback) {
    getProductFromFile(products => {
      const product = products.find(p => p.id === id)
      callback(product)
    })
  }

}