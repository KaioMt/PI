const Sequelize = require('sequelize');

const connection = new Sequelize('autentique', 'root', 'ka050803', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;