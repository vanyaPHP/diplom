const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const SyncSQL = require('sync-sql');
const socketIo = require('socket.io');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8003;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000'/*, credentials: true */}));

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
};

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      //credentials: true
    }
  });

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (chatId) => {
        socket.join(chatId);
        console.log(`Client joined chat ${chatId}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.get('/api/chats', (req, res) => {  
    res.json(fetchChatsByUser(req.query.user_id));
});

app.post('/api/chats', (req, res) => {
    const { first_user_id, second_user_id } = req.body;
    const result = SyncSQL.mysql(dbConfig, 
        'INSERT INTO Chat (first_user_id, second_user_id) VALUES (?, ?)', [first_user_id, second_user_id]);
    if (result.error) {
        return res.status(500).json({ message: result.error });
    }

    const newChat = fetchChatById(result.data.rows.insertId);
    io.emit('chat', { action: 'create', chat: newChat });
    res.status(201).json(newChat);
});

app.get('/api/chats/:chatId/messages', (req, res) => {
    const { chatId } = req.params;
    const result = fetchMessages(chatId);
    if (result.error) {
        return res.status(500).json({ message: result.error });
    }
    res.json(result);
});

app.post('/api/chats/:chatId/messages', (req, res) => {
  const { chatId } = req.params;
  const { message_text, message_datetime, sender_id } = req.body;
  const result = SyncSQL.mysql(dbConfig, 
    'INSERT INTO Message (message_text, message_datetime, chat_id, sender_id) VALUES (?, ?, ?, ?)', 
    [message_text, message_datetime, chatId, sender_id]);
  if (result.error) {
    return res.status(500).json({ message: result.error });
  }
  const newMessage = fetchMessages(chatId, result.data.rows.insertId);
  io.emit('message', { action: 'create', message: newMessage });
  res.status(201).json(newMessage);
});


const fetchChatsByUser = (userId) => {
    const result = SyncSQL.mysql(dbConfig,
        `SELECT * FROM Chat WHERE first_user_id = ${userId}
            OR second_user_id = ${userId}`);
    if (result.error) {
        return res.status(500).json({ message: result.error });
    }

    var data = [];
    for(let i = 0;i < result.data.rows.length;i++)
    { 
        let row = result.data.rows[i];
        row.first_user = SyncSQL.mysql(dbConfig, 
            `SELECT * FROM User WHERE user_id = ${row.first_user_id}`).data.rows[0];
        row.second_user = SyncSQL.mysql(dbConfig, 
            `SELECT * FROM User WHERE user_id = ${row.second_user_id}`).data.rows[0];
        
        delete row.first_user_id;
        delete row.second_user_id;
        
        data.push(row);    
    }

    return data;
}

const fetchChatById = (chatId) => {
    const result = SyncSQL.mysql(dbConfig,
        `SELECT * FROM Chat WHERE chat_id = ${chatId}`);
    if (result.error) {
        return res.status(500).json({ message: result.error });
    }

    var data = result.data.rows[0];
    row.first_user = SyncSQL.mysql(dbConfig, 
        `SELECT * FROM User WHERE user_id = ${row.first_user_id}`).data.rows[0];
    row.second_user = SyncSQL.mysql(dbConfig, 
        `SELECT * FROM User WHERE user_id = ${row.second_user_id}`).data.rows[0];
    
    delete row.first_user_id;
    delete row.second_user_id;

    return data;
}

const fetchMessages = (chatId , messageId = null) => {
    let condition = `WHERE chat_id = ${chatId}`;
    if (messageId) {
        condition += ` AND message_id = ${messageId}`;
    }
    const result = SyncSQL.mysql(dbConfig,
        `SELECT * FROM Message ${condition}`);
    if (result.error) {
        return res.status(500).json({ message: result.error });
    }

    let data = null;

    if (messageId) {
        data = result.data.rows[0];
        data.sender = SyncSQL.mysql(dbConfig, 
        `SELECT * FROM User WHERE user_id = ${data.sender_id}`).data.rows[0];
    
        delete data.sender_id;
    } else {
        data = result.data.rows;
        for(let i = 0;i < data.length;i++)
        {
            data[i].sender = SyncSQL.mysql(dbConfig, 
                `SELECT * FROM User WHERE user_id = ${data[i].sender_id}`).data.rows[0];
            
            delete data[i].sender_id;
        }
    }
    

    return data;
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
