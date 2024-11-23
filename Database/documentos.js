const Sequelize = require("sequelize");
const connection = require("./database");

const documentos = connection.define('Documentos', {
    ID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    Titulo: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    Conteudo: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    Email_dest: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    Status: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Empresa: {
      type: Sequelize.INTEGER,
      model: 'empresa',
      allowNull: true // Pode ser nulo
    },
    id_usuario: {
      type: Sequelize.INTEGER,
      model: 'usuario',
      allowNull: true, // Pode ser nulo
    }
  });

  //connection.sync()
   //.then(() => console.log('Tabela Documentos criada ou sincronizada com sucesso!'))
   //.catch(err => console.error('Erro ao sincronizar a tabela Documentos:', err));

module.exports = documentos;