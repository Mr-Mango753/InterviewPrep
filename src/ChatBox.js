// src/components/ChatBox.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      // Send user message to the OpenAI API
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        "messages": [
          {
            "role": "user",
            "content": newMessage
          }
        ],
        max_tokens: 50,
        model: 'gpt-3.5-turbo'
      }, {
        headers: {
          'Authorization': 'Bearer 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', //${api_key.env.OPENAI_API_KEY}',
          'Content-Type': 'application/json',
        },
      });
  
      // Extract the AI response from the API response
      const responseText = response.data.choices[0].message.content;
      console.log(responseText);
  
      // Update the chat interface
      setMessages([...messages, { text: newMessage, user: true }, { text: responseText, user: false }]);
      setNewMessage('');
    } catch (error) {
        console.error('Error sending message to OpenAI API:', error.response.status, error.response.data);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={message.user ? 'user-message' : 'ai-message'}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button className="chat-button" onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;