const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const User = require('./User');

const Chat = sequelize.define('Chat', {
    chatId: {
        type: DataTypes.BIGINT,
        field: 'chat_id',
        primaryKey: true,
        autoInrecrement: true
    },
    firstUserId: {
        type: DataTypes.BIGINT,
        field: 'first_user_id'
    },
    secondUserId: {
        type: DataTypes.BIGINT,
        field: 'second_user_id'
    }
},
{
    tableName: 'Chat',
    timestamps: false
});


module.exports = Chat;