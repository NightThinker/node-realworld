const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', '5221043005', {
  dialect: 'mysql',
  host: 'localhost'
})

module.exports = sequelize
