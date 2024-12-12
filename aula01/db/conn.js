import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Caminho para o arquivo do banco de dados
});

try {
  sequelize.authenticate();
  console.log('Database Connected!');
} catch (error) {
  console.log('Não conectou', error);
}

export default sequelize;