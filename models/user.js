const mongobd = require('mongodb')
const getDb = require('../util/database').getDb

const ObjectId = mongobd.ObjectId

class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }
  
  save() {
    const db = getDb()
    return db
      .collection('users')
      .insertOne(this)
      // .then(() => {
      //   console.log('Add User')
      // })
      // .catch(err => console.log(err))

  }

  static findById(userId) {
    const db = getDb()
    return db.collection('users')
      .findOne({ _id: new ObjectId(userId) })
  }
}

module.exports = User