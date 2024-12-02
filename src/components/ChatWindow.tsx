import React from 'react';
import { MessageSquare, Send, RefreshCw } from 'lucide-react';
import { Message } from '../types';

interface ChatWindowProps {
  messages: Message[];
  userInput: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export function ChatWindow({
  messages,
  userInput,
  onInputChange,
  onSendMessage,
  onReset,
  isLoading,
}: ChatWindowProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      <div className="bg-red-600 p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          Santa's Chatbot
        </h2>
        <button
          onClick={onReset}
          className="text-white hover:text-red-200 transition-colors"
          aria-label="Reset chat"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
      
      <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-[url('https://images.unsplash.com/photo-1544649673-989c465ff7cf?q=80&w=1920')] bg-cover">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-red-600 text-white rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-50 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          />
          <button
            onClick={onSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}