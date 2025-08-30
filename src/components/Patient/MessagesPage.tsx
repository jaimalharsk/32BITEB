import React, { useState } from 'react';
import { Send, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';

const MessagesPage: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');

  // Mock messages data
  const messages = [
    {
      id: 1,
      sender: 'Dr. Smith',
      message: 'Great progress on your compliance this week! Keep up the excellent work.',
      timestamp: new Date(2024, 11, 20, 14, 30),
      isFromClinic: true,
    },
    {
      id: 2,
      sender: 'You',
      message: 'Thank you! I have a question about my next tray change.',
      timestamp: new Date(2024, 11, 20, 16, 15),
      isFromClinic: false,
    },
    {
      id: 3,
      sender: 'Dr. Smith',
      message: 'Of course! You can change to tray #13 this Friday. Remember to wear them for 20+ hours daily.',
      timestamp: new Date(2024, 11, 21, 9, 0),
      isFromClinic: true,
    },
    {
      id: 4,
      sender: 'AlignClinic System',
      message: 'Reminder: You\'re doing great! Today\'s goal is 20 hours of wear time.',
      timestamp: new Date(),
      isFromClinic: true,
      isSystem: true,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">Chat with your dental team</p>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Dr. Smith\'s Office</h3>
            <p className="text-sm text-gray-600">Usually responds within 2 hours</p>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors">
              <Phone className="h-4 w-4" />
            </button>
            <button className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors">
              <Mail className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isFromClinic ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.isFromClinic
                  ? message.isSystem
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-900'
                  : 'bg-primary-500 text-white'
              }`}
            >
              {message.isFromClinic && (
                <div className="text-xs font-medium mb-1 opacity-70">
                  {message.sender}
                </div>
              )}
              <div className="text-sm">{message.message}</div>
              <div className={`text-xs mt-1 opacity-70`}>
                {format(message.timestamp, 'MMM dd, h:mm a')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white rounded-xl border border-gray-200 p-3">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-primary-500 text-white p-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
