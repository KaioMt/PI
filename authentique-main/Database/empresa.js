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
    allowNull: false
  },
  Endereco: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  Telefone: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  Id_documento: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'documento',  // Supondo que você tenha uma tabela 'documento'
      key: 'Id'
    }
  }
}, {
  tableName: 'empresa',
  timestamps: false, // Remova se você quiser timestamps automáticos (createdAt, updatedAt)
});

//connection.sync()
//.then(() => console.log('Tabela Empresa criada ou sincronizada com sucesso!'))
//.catch(err => console.error('Erro ao sincronizar a tabela Empresa:', err));

module.exports = Empresa;