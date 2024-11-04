const Sequelize = require("sequelize");
const connection = require("./database");

const usuario = connection.define('usuario', {
    Nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Senha:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

usuario.sync({force:false}).then(() => {});