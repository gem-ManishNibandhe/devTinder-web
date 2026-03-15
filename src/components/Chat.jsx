import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

export const Chat = () => {
    const { targetUserId } = useParams()
    const [messages, setMessages] = React.useState([
    ])
    const [newMessage, setNewMessage] = React.useState('')

    const user = useSelector((store) => store.user);
    
    const userId = user?._id

    const fetchChatHistory = async () => {
        try {
            const chats =await axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true });
    
            const chatMessages = (chats?.data?.messages || []).map((msg) => {
                const { senderId, text } = msg || {};
                return {
                    text,
                    firstName: senderId?.firstName || '',
                    lastName: senderId?.lastName || ''
                };
            });

            setMessages(chatMessages || []);
        } catch (err) {
            console.error('Error fetching chat history:', err);
        }
    }

    useEffect(() => {
        fetchChatHistory();
    }, [])


    const handleSendMessage = () => {
        const socket = createSocketConnection();
        if (newMessage.trim() === '') return
        if (!userId) {
            console.warn('Cannot send message: no userId yet')
            return
        }
        
    // emit to server
    console.log('Emitting sendMessage with payload:', { firstName: user?.firstName, lastName: user?.lastName, userId, targetUserId, text: newMessage });
    // socket.emit('sendMessage', { firstName: user?.firstName, lastName: user?.lastName, userId, targetUserId, text: newMessage });
        setNewMessage('')
        
    }

   
    useEffect(() => {
        
        if (!userId) {
            console.log('Chat useEffect: no userId yet, waiting...')
            return 
        }
        
        const socket = createSocketConnection();

        console.log('Joining chat with:', { firstName: user?.firstName, userId, targetUserId });

        // join the chat room for this pair
        socket.emit('joinChat', { firstName: user?.firstName, userId, targetUserId });

        const onReceive = (payload) => {
            const { firstName,lastName, text, userId: senderId } = payload || {};
            // if server echoes messages back to sender, avoid duplicate by ignoring our own id
            if (senderId === userId) return
            setMessages((prevMessages) => [...prevMessages, { text, firstName, lastName, userId: senderId }]);
        };

        socket.on('receiveMessage', onReceive);

        // cleanup: remove listener and optionally leave room
        return () => {
            socket.off('receiveMessage', onReceive);
            socket.emit('leaveChat', { userId, targetUserId });
        }
    }, [userId, targetUserId])
    

    return (
        <div className="flex flex-col items-center my-10 w-full max-w-3xl mx-auto border border-gray-300 rounded-lg p-5">
            <h1 className="pb-2 mb-4 w-full border-b border-gray-200">Chat with User ID: {targetUserId}</h1>

            <div className="w-full">
                <div className="h-96 overflow-y-auto p-4 flex flex-col gap-3">
                        {messages.map((msg, index) => (
                            <div key={index} className={"chat " + (user.firstName === msg.firstName ? 'chat-end' : 'chat-start')}>
                                <div className="chat-header">
                                    {`${msg.firstName} ${msg.lastName || ''}`}
                                    <time className="text-xs opacity-50">2 hours ago</time>
                                </div>
                                <div className="chat-bubble">{msg.text}</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                        ))}

                    {/* more static example messages; align left (received) or right (sent) */}
                </div>
            </div>

            <div className="w-full mt-4">
                <div className="flex items-center w-full">
                    <input value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text" placeholder="Type a message..." className="input input-bordered w-full"  />
                    <button className="btn btn-primary ml-2" onClick={handleSendMessage}> ᐷ</button>
                </div>
            </div>
        </div>
    )
}
