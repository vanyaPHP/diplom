const express = require('express');
const cors = require('cors');
const http = require('http');
const { Op } = require('sequelize');
const Chat = require('./database/models/Chat');
const User = require('./database/models/User');
const Message = require('./database/models/Message');
const socketIo = require('socket.io');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
const server = http.createServer(app);
const port = process.env.PORT || 8002;
const io = socketIo(server);

app.use(express.json());

io.on("connection", (socket) => {
    console.log(`new connection ${socket.id}`);

    socket.on("getChat", async (message) => {
        const data = JSON.parse(message);
        const chat = await Chat.findByPk(data.id);
        let chatInfo = {
            chat: chat,
            firstUser: await User.findByPk(chat.firstUserId),
            secondUser: await User.findByPk(chat.secondUserId),
            messages: await Message.findAll({where: {chatId: chat.chatId}})
        };

        socket.emit("getChat", JSON.stringify(chatInfo));
    });

    socket.on("getChats", async (message) => {
        const data = JSON.parse(message);
        const user_id = data.user_id;
        let whereClause = {
            [Op.or]: {}
        };
        whereClause[Op.or].firstUserId = user_id;
        whereClause[Op.or].secondUserId = user_id;
    
        const chats = await Chat.findAll({where: whereClause});
        const chatsInfo = [];
        for(let i = 0;i < chats.length; i++) {
            let secondUserId = (user_id == chats[i].firstUserId) ? chats[i].secondUserId : chats[i].firstUserId;
            let chatInfo = {
                chat: chats[i],
                secondUser: await User.findByPk(secondUserId)
            };
    
            chatsInfo.push(chatInfo);
        }

        socket.emit("getChats", JSON.stringify(chatsInfo));
    });

    socket.on("newMessage", async (message) => {
        const data = JSON.parse(message);
        const messageDateTime = new Date().toString();
        const newMessage = await Message.create({
            messageText: data.messageText,
            senderId: data.senderId,
            chatId: data.chatId,
            messageDateTime: messageDateTime
        });

        io.emit("messageSent", JSON.stringify(newMessage));
    });
});

/*app.post('/chats', async(req, res) => {
    const { firstUserId, secondUserId } = req.body;
    const chat = await Chat.findByPk({where: {
        firstUserId: firstUserId,
        secondUserId: secondUserId
    }});
    if (!chat) {
        const chat = await Chat.create({
            firstUserId: firstUserId,
            secondUserId: secondUserId
        });
    }

    res.json(chat);
});*/


server.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});
