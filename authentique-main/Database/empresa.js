const Sequelize = require("sequelize");
const connection = require("./database");

const Empresa = connection.define('Empresa', {
  Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CNPJ: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  Nome: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  Endereco: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  Estado: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  Id_documento: {
    type: Sequelize.INTEGER(100),
    allowNull: true,
    references: {
      model: 'documentos',
      key: 'Id'
    }
  },
  Razao: {
    type: Sequelize.STRING(255),
    allowNull: false
  }, 
   Bairro: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  Numero: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'empresa',
  timestamps: false, // Remova se você quiser timestamps automáticos (createdAt, updatedAt)
});

// connection.sync()
// .then(() => console.log('Tabela Empresa criada ou sincronizada com sucesso!'))
// .catch(err => console.error('Erro ao sincronizar a tabela Empresa:', err));

module.exports = Empresa;