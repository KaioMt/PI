const Sequelize = require('sequelize');

const connection = new Sequelize('autentique', 'root', 'joaopedro12', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;