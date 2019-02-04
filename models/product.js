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
  constructor(title, imageUrl, description, price) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    // products.push(this)
    getProductFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err)
      })
    })
  }

  static fetchAll(callback) {
    getProductFromFile(callback)
  }
}