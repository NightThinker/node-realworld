const mongodb = require('mongodb')

const MongoClient =mongodb.MongoClient

let _db
const MongoConnect = (callback) => {
  MongoClient.connect(
      'mongodb+srv://may:5221043005@cluster0-rnstb.mongodb.net/shop?retryWrites=true'
    )
    .then(client => {
      console.log('Connected!')
      _db = client.db()
      callback()
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

const getDb = () => {
  if(_db) {
    return _db
  }
  throw 'No database found!'
}

exports.MongoConnect = MongoConnect
exports.getDb = getDb