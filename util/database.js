const mongodb = require('mongodb')

const MongoClient =mongodb.MongoClient

const MongoConnect = (callback) => {
  MongoClient.connect(
      'mongodb+srv://may:5221043005@cluster0-rnstb.mongodb.net/test?retryWrites=true'
    )
    .then(client => {
      console.log('Connected!')
      callback(client)
    })
    .catch(err => console.log(err))
}

module.exports = MongoConnect