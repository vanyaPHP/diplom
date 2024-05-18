const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Message = sequelize.define('Message', {
    messageId: {
        type: DataTypes.BIGINT,
        field: 'message_id',
        primaryKey: true,
        autoInrecrement: true
    },
    messageText: {
        type: DataTypes.TEXT,
        field: 'message_text'
    },
    senderId: {
        type: DataTypes.BIGINT,
        field: 'sender_id'
    },
    chatId: {
        type: DataTypes.BIGINT,
        field: 'chat_id'
    },
    messageDateTime: {
        type: DataTypes.DATE,
        field: 'message_datetime'
    }
},
{
    tableName: 'Message',
    timestamps: false
});

module.exports = Message;