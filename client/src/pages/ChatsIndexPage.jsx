import { useContext, useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Helpers/Navbar";
import Footer from "../components/Helpers/Footer";
import { UserContext } from "../UserContext";
import { io } from "socket.io-client";
import {css} from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const socket = io('http://localhost:8003');

export default function ChatsIndexPage() {
    const {user, getUser} = useContext(UserContext);
    const [chats, setChats] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [queryParams] = useSearchParams();
    const [isNewMessageLoading, setIsNewMessageLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `; 

    useEffect(() => {
        if (!user) {
            getUser();
        } else {
            fetchChats(queryParams.get('chat_id'));
            if (selectedChat) {
                fetchMessages(selectedChat.chat_id);
            }
            socket.on('chat', handleChatEvent);
            socket.on('message', handleMessageEvent);
            return () => {
                socket.off('chat', handleChatEvent);
                socket.off('message', handleMessageEvent);
            };
        }
    }, [user, selectedChat]);
    
    const handleChatEvent = (data) => {
        const { action, chat } = data;
        if (action === 'create') {
          if (!chats) {
              setChats([chat]);
          }
          setChats(prevChats => [...prevChats, chat]);
        }
    };
    
    const handleMessageEvent = (data) => {
        const { action, message } = data;
        if (action === 'create' && message.chat_id == selectedChat.chat_id) {
          setMessages(prevMessages => [...prevMessages, message]);
        }
    };
    
    const fetchChats = (chatIdToSelect = null) => {
        axios.get(`http://localhost:8003/api/chats?user_id=${user.data.id}`)
          .then(response => {
            if (chatIdToSelect) {
                setSelectedChat(response.data.filter((chat) => chat.chat_id == chatIdToSelect)[0]);
            }
            setChats(response.data);
          })
          .catch(error => {
            console.error('Error fetching chats:', error);
          });
    };
    
    const fetchMessages = (chatId) => {
        axios.get(`http://localhost:8003/api/chats/${chatId}/messages`)
          .then(response => {
            setMessages(response.data);
            socket.emit('join', chatId);
          })
          .catch(error => {
            console.error(`Error fetching messages for chat ${chatId}:`, error);
        });
    };
    
    
    const sendMessage = (chatId) => {
        if (newMessage.length > 0) {
            setIsNewMessageLoading(true);
            let date = new Date();
            let day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            axios.post(`http://localhost:8003/api/chats/${chatId}/messages`, {
                message_text: newMessage,
                message_datetime: day + " " + time,
                sender_id: user.data.id 
             })
             .then(() => {
               setNewMessage('');
               setIsNewMessageLoading(false);
             })
             .catch(error => {
               console.error('Error sending message:', error);
             });
        }
    };

    return (
      <>
          <Navbar/>
              <div className="flex bg-gray-100 min-h-screen">
                  <div className="w-1/4 bg-white border-r overflow-y-scroll">
                    <h1 className="text-xl font-bold py-4 px-6 border-b border-gray-200">Чаты</h1>
                    {
                        chats 
                        ?
                        <ul>
                        {chats.map(chat => (
                          <li key={chat.id} className="px-6 py-4 cursor-pointer border-b border-gray-200 hover:bg-gray-50" onClick={() => setSelectedChat(chat)}>
                            {
                                chat.first_user.user_id == user.data.id
                                ?
                                    <>
                                      {chat.second_user.first_name} {chat.second_user.last_name}
                                    </>
                                :
                                    <>
                                      {chat.first_user.first_name} {chat.first_user.last_name}
                                    </>
                            }
                          </li>
                        ))}
                      </ul>
                        :
                          <div 
                            className="ring-loader mt-32" style={{minHeight: "10vh", display: "grid", placeContent: "center"}}>
                            <ClockLoader
                              css={override}
                              size={250}
                              color={"#9CA3AF"}
                              loading={true}/>
                          </div>
                    }
                  </div>
                  {selectedChat && 
                  (
                    messages && !isNewMessageLoading
                    ?
                      <div className="flex-1 flex flex-col">
                          {selectedChat && (
                            <div className="flex flex-col flex-1">
                              <div className="bg-white border-b border-gray-200 flex justify-between items-center p-4">
                                <h2 className="text-lg font-bold">
                                  {
                                      selectedChat.first_user.user_id == user.data.id
                                      ?
                                          <>
                                            {selectedChat.second_user.first_name} {selectedChat.second_user.last_name}
                                          </>
                                      :
                                          <>
                                            {selectedChat.first_user.first_name} {selectedChat.first_user.last_name}
                                          </>
                                  }
                                </h2>
                              </div>
                              <div className="flex-1 bg-white border rounded-md border-gray-200 p-4 overflow-y-scroll">
                                {messages && messages.map((message) => (
                                  <div key={message.message_id} 
                                    className={`
                                      mb-4 ${message.sender.user_id == user.data.id
                                        ? 'text-right'
                                        : 'text-left'}
                                    `}>
                                    <span 
                                      className={`inline-block rounded-lg px-3
                                        py-1 max-w-xs ${message.sender.user_id == user.data.id
                                            ? 'text-black bg-gray-400'
                                            : 'text-white bg-blue-700'}
                                      `}
                                    >
                                      {message.message_text}
                                      <span 
                                        className={`block text-xs mt-2 
                                          ${
                                              message.sender.user_id == user.data.id
                                              ?
                                                'text-black text-right'
                                              :
                                                'text-white text-right'    
                                          }
                                        `}>
                                        {new Date(Date.parse(message.message_datetime))
                                          .toISOString()
                                          .replace('T', ' ')
                                          .substring(0, 16)
                                        }
                                      </span>
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex items-center p-4 gap-4">
                                  <input
                                    type="text"
                                    className="border border-gray-300 p-3 w-full rounded-l"
                                    placeholder="Введите сообщение..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                  />
                                  <button 
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
                                    onClick={() => sendMessage(selectedChat.chat_id)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                  </button>
                              </div>
                            </div>
                          )}
                      </div>
                    :
                      <div 
                        className="ring-loader m-auto mb-96" style={{minHeight: "10vh", display: "grid", placeContent: "center"}}>
                        <ClockLoader
                          css={override}
                          size={250}
                          color={"#9CA3AF"}
                          loading={true}/>
                      </div>
                  )
                  }
              </div>
          <Footer/>
      </>
    );
}