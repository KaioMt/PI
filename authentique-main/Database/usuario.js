const Sequelize = require("sequelize");
const connection = require("./database");

const Usuario = connection.define('Usuario', {
    Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    Nome: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING(256),
      allowNull: true,
    },
    Senha: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    Empresa_Id: {
      type: Sequelize.INTEGER,
      allowNull: true,//lembrar de trocarrr
      references: {
        model: 'empresa', // Nome da tabela referenciada
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'usuarios',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
  });

  connection.sync()
  .then(() => console.log('Tabela Usuarios criada ou sincronizada com sucesso!'))
  .catch(err => console.error('Erro ao sincronizar a tabela Usuarios:', err));
  
  module.exports = Usuario;