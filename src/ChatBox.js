import React, { useState, useEffect } from 'react';
import { sendMessageToAI } from './utils/GptAPI';
//import VoiceToText, { sendTranscriptToBackend } from './components/VoiceToText.jsx';

const ChatBox = ({ setTranscript, setUserSpeech, userSpeech }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (userSpeech) {
      // Automatically click the button when userSpeech is not empty
      console.log('user speech in gpt: ' + userSpeech);
      setNewMessage(userSpeech);
    }
  }, [userSpeech]);
  
  useEffect(() => {
    // Only call handleSendMessage when newMessage changes
    if (newMessage) {
      console.log('new message in gpt: ' + newMessage);
      handleSendMessage();
    }
  }, [newMessage]);

  useEffect(() => {
    const initialContext = {
      "role": "system",
      "content": "You are an interviewer for a major Software Engineering company." + 
      " You are here today to assess the user on their behavior through a behavioral test. ONLY act as the interviewer and AWAIT THEIR MESSAGE." +
      " Start with asking their introduction. No need to say you are the interviewer, we know."
    };
    console.log("Use Effect")
    gptCall([initialContext]); 
  }, []);

  const gptCall = async (newMessages) => {
    try {
      const responseText = await sendMessageToAI(newMessages);
      setMessages([...newMessages, { "role": "assistant", "content": responseText }]);
      console.log(messages);

      setTranscript(responseText);

      document.getElementById('generate-audio-button').click();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const updatedMessages = [...messages, { "role": "user", "content": newMessage }];
      gptCall(updatedMessages);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={message.role === "user" ? 'user-message' : 'ai-message'}>
            {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={userSpeech}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button className="chat-button" onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;
