import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ChatList({chats}) {    
    const [redirect, setRedirect] = useState('');

    function showChat(chatId) {
        setRedirect(`/chats/${chatId}`);
    }

    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return (
        <ul className="p-4 flex-grow overflow-y-auto">
            {chats.map((chat) => 
                <>
                    <li onClick={() => showChat(chat.chat.chatId)} className="py-4 rounded-xl hover:bg-gray-300 hover:cursor-pointer transition-colors duration-300">
                        {chat.secondUser.firstName} {chat.secondUser.lastName}
                    </li>
                    <hr className="border-t border-gray-300 my-4" />
                </>
            )}
        </ul>
    );
}