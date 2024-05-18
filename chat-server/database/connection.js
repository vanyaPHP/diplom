const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;