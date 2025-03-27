import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { MessageCircleIcon, SendIcon } from 'lucide-react';
interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}
interface ChatBoxProps {
  sellerId: string;
  sellerName: string;
  accountId: string;
  onClose: () => void;
}
const ChatBox: React.FC<ChatBoxProps> = ({
  sellerId,
  sellerName,
  accountId,
  onClose
}) => {
  const {
    user
  } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Load existing messages from localStorage
    const chatKey = `chat_${user?.id}_${sellerId}_${accountId}`;
    const savedMessages = localStorage.getItem(chatKey);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [user?.id, sellerId, accountId]);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      receiverId: sellerId,
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };
    const chatKey = `chat_${user.id}_${sellerId}_${accountId}`;
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));
    // Add notification for seller
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({
      id: Date.now().toString(),
      type: 'chat',
      userId: sellerId,
      senderId: user.id,
      senderName: user.username,
      accountId,
      timestamp: new Date().toISOString(),
      read: false
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));
    setNewMessage('');
  };
  return <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <MessageCircleIcon size={20} />
          <span className="font-semibold">{sellerName}</span>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          ×
        </button>
      </div>
      <div className="h-96 overflow-y-auto p-4">
        {messages.map(message => <div key={message.id} className={`mb-4 ${message.senderId === user?.id ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${message.senderId === user?.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
              <p className="text-sm">{message.text}</p>
              <p className="text-xs mt-1 opacity-75">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>)}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-3 border-t">
        <div className="flex space-x-2">
          <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500" />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            <SendIcon size={20} />
          </button>
        </div>
      </form>
    </div>;
};
export default ChatBox;