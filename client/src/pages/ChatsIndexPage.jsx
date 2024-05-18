import { useParams } from "react-router-dom";
import Navbar from "../components/Helpers/Navbar";
import ChatList from "../components/Chat/ChatList";
import ChatInfo from "../components/Chat/ChatInfo";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { io } from "socket.io-client";

//const socket = io.connect('http://localhost:8002');

export default function ChatsIndexPage() {
    const params = useParams();
    const { user, getUser } = useContext(UserContext);

    useEffect(() => {
        if (!user) {
            getUser();
        } else {
            /*socket.on('getChats', (message) => {
                console.log(message);
            });
            socket.emit('getChats');*/
        }
    }, []);

    if (user) {
        return (
            <>
                <Navbar/>
                <div className="flex bg-slate-600 h-screen">
                    <div className="w-1/4 text-white flex flex-col">
                        <ChatList/>
                    </div>
                    {params.id && (
                         <div className="flex-1 flex flex-col">
                            <ChatInfo/>
                            <div className="bg-white p-4 border-t border-gray-300 flex">
                                <input 
                                    type="text"
                                    placeholder="Type a message..."
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                />
                                <button className="bg-blue-500 text-white ml-4 px-4 py-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                    {!params.id && (
                        <div className="flex-1 flex flex-col">
                            <div className="overflow-y-auto p-4 bg-white flex-grow flex justify-center items-center h-screen">
                                <h2 className="text-xl text-gray-500">Select a chat to start messaging</h2>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
}