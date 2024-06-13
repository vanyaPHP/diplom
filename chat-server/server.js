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
    let is_admin = req.query.is_admin;
    let id = req.query.id;
    res.json(fetchChatsByUser(id, is_admin));
});

app.post('/api/chats', (req, res) => {
    const { first_user_id, second_user_id } = req.body;
    
    const resultsForExistance = SyncSQL.mysql(dbConfig, 
        'SELECT * FROM Chat WHERE first_user_id = ? AND second_user_id = ?', [first_user_id, second_user_id]);
    if (resultsForExistance.error) {
        return res.status(500).json({ message: result.error });
    }

    if (resultsForExistance.data.rows.length > 0) {
        const existingChat = fetchChatById(resultsForExistance.data.rows[0].chat_id);
        res.status(201).json(existingChat);
    } else {
        const result = SyncSQL.mysql(dbConfig, 
            'INSERT INTO Chat (first_user_id, second_user_id) VALUES (?, ?)', [first_user_id, second_user_id]);
        if (result.error) {
            return res.status(500).json({ message: result.error });
        }
    
        const newChat = fetchChatById(result.data.rows.insertId);
        io.emit('chat', { action: 'create', chat: newChat });
        res.status(201).json(newChat);
    }
});

app.get('/api/chats/:chatId/messages', (req, res) => {
    const { chatId } = req.params;
    const is_admin_chat = req.query.is_admin_chat;
    const result = fetchMessages(chatId, null, is_admin_chat);
    if (result.error) {
        return res.status(500).json({ message: result.error });
    }
    res.json(result);
});

app.post('/api/chats/:chatId/messages', (req, res) => {
  const { chatId } = req.params;
  const is_admin_chat = req.query.is_admin_chat;
  let result = null;
  if (is_admin_chat) {
      const { report_message_text, report_message_datetime, is_admin_sender } = req.body;
      result = SyncSQL.mysql(dbConfig, 
        'INSERT INTO Report_message (report_message_text, report_message_datetime, report_chat_id, is_admin_sender) VALUES (?, ?, ?, ?)', 
        [report_message_text, report_message_datetime, chatId, is_admin_sender]);
      if (result.error) {
        return res.status(500).json({ message: result.error });
      }
  } else {
      const { message_text, message_datetime, sender_id } = req.body;
      result = SyncSQL.mysql(dbConfig, 
        'INSERT INTO Message (message_text, message_datetime, chat_id, sender_id) VALUES (?, ?, ?, ?)', 
        [message_text, message_datetime, chatId, sender_id]);
      if (result.error) {
        return res.status(500).json({ message: result.error });
      }
  }
  const newMessage = fetchMessages(chatId, result.data.rows.insertId, is_admin_chat);
  io.emit('message', { action: 'create', message: newMessage });
  res.status(201).json(newMessage);
});


const fetchChatsByUser = (is_admin, id) => {
    let chats = [];
    let defaultChats = [];
    let reportChats = [];

    if (is_admin) {
        const result = SyncSQL.mysql(dbConfig,
            `SELECT * FROM Report_Chat WHERE admin_id = ${id}`);
        if (result.error) {
            return res.status(500).json({ message: result.error });
        }

        for(let i = 0;i < result.data.rows.length;i++)
        {
            let row = result.data.rows[i];
            row.admin = SyncSQL.mysql(dbConfig,
                `SELECT * FROM Admin WHERE admin_id = ${row.admin_id}`);
            row.user = SyncSQL.mysql(dbConfig,
                `SELECT * FROM User WHERE user_id = ${row.user_id}`);    
    
            delete row.admin_id;
            delete row.user_id;
    
            reportChats.push(row);
        }
    } else {
        const result = SyncSQL.mysql(dbConfig,
            `SELECT * FROM Chat WHERE first_user_id = ${id}
                OR second_user_id = ${id}`);
        if (result.error) {
            return res.status(500).json({ message: result.error });
        }

        const reportResult = SyncSQL.mysql(dbConfig,
            `SELECT * FROM Report_chat WHERE user_id = ${id}`);
        if (reportResult.error) {
            return res.status(500).json({ message: reportResult.error });
        }

        for(let i = 0;i < result.data.rows.length;i++)
        { 
            let row = result.data.rows[i];
            row.first_user = SyncSQL.mysql(dbConfig, 
                `SELECT * FROM User WHERE user_id = ${row.first_user_id}`).data.rows[0];
            row.second_user = SyncSQL.mysql(dbConfig, 
                `SELECT * FROM User WHERE user_id = ${row.second_user_id}`).data.rows[0];
            
            delete row.first_user_id;
            delete row.second_user_id;
            
            defaultChats.push(row);    
        }

        for(let i = 0;i < reportResult.data.rows.length;i++)
        {
            let row = reportResult.data.rows[i];
            row.admin = SyncSQL.mysql(dbConfig,
                `SELECT * FROM Admin WHERE admin_id = ${row.admin_id}`);
            row.user = SyncSQL.mysql(dbConfig,
                `SELECT * FROM User WHERE user_id = ${row.user_id}`);    

            delete row.admin_id;
            delete row.user_id;

            reportChats.push(row);
        }
    }

    chats.push(defaultChats);
    chats.push(reportChats);

    return chats;
}

const fetchChatById = (chatId) => {
    const result = SyncSQL.mysql(dbConfig,
        `SELECT * FROM Chat WHERE chat_id = ${chatId}`);
    if (result.error) {
        return res.status(500).json({ message: result.error });
    }

    var data = result.data.rows[0];
    data.first_user = SyncSQL.mysql(dbConfig, 
        `SELECT * FROM User WHERE user_id = ${data.first_user_id}`).data.rows[0];
    data.second_user = SyncSQL.mysql(dbConfig, 
        `SELECT * FROM User WHERE user_id = ${data.second_user_id}`).data.rows[0];
    
    delete data.first_user_id;
    delete data.second_user_id;

    return data;
}

const fetchMessages = (chatId , messageId = null, is_admin_chat) => {
    let data = null;
    if (is_admin_chat) {
        let query = `SELECT * FROM Report_message WHERE report_chat_id = ${chatId}`;
        if (messageId) {
            query += ` AND report_message_id = ${messageId}`;
        }

        const result = SyncSQL.mysql(dbConfig, query);
        if (result.error) {
            return res.status(500).json({ message: res.error });
        }

        if (messageId) {
            data = result.data.rows[0];
            data.report_chat = Synq.mysql(dbConfig, 
                `SELECT * FROM Report_chat WHERE report_chat_id = ${data.report_chat_id}`).data.rows[0];
            delete data.report_chat_id;
        } else {
            data = result.data.rows;
            for(let i = 0;i < data.length;i++)
            {
                data[i].report_chat = SyncSQL.mysql(dbConfig, 
                    `SELECT * FROM Report_chat WHERE report_chat_id = ${data[i].report_chat_id}`).data.rows[0];
                
                delete data[i].report_chat_id;
            }
        }
    } else {
        let condition = `WHERE chat_id = ${chatId}`;
        if (messageId) {
            condition += ` AND message_id = ${messageId}`;
        }
        const result = SyncSQL.mysql(dbConfig,
            `SELECT * FROM Message ${condition}`);
        if (result.error) {
            return res.status(500).json({ message: result.error });
        }

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
    }


    return data;
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
