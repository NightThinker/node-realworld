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
  constructor(t) {
    this.title = t
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