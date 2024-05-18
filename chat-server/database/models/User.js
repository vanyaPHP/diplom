const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Chat = require('./Chat');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.BIGINT,
        field: 'user_id',
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
    },
    phoneNumber: {
        type: DataTypes.STRING,
        field: 'phone_number'
    },
    email: {
        type: DataTypes.STRING,
        field: 'email'
    },
    password: {
        type: DataTypes.STRING
    }
},
{
    tableName: 'User',
    timestamps: false
});


module.exports = User;