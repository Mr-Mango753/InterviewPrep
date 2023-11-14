import React, { useState, useEffect } from 'react';
import { sendMessageToAI } from './utils/GptAPI';
//import VoiceToText, { sendTranscriptToBackend } from './components/VoiceToText.jsx';

const ChatBox = ({ setTranscript, userSpeech, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState('');
  const [timer, setTimer] = useState(0);
  var responses = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userSpeech) {
      // Automatically click the button when userSpeech is not empty
      console.log('user speech in gpt: ' + userSpeech);
      responses++;
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
      "content": "You are an interview for a major Software Engineering company." + 
      " You are here today to assess the user on their behavior through a behavioral test. ONLY act as the interviewer and AWAIT THEIR MESSAGE." +
      " Start with asking their introduction. No need to say you are the interviewer, we know. After they introduce themselves, ask for their resume." +
      " When you are interacting with the candidate, please act empathetic but firm in your questions." +
      " If the candidate's answer is inappropriate, please feel free to either remind them they are an in interview or thank them for their time." +
      " If the candidate's answer is great, please feel free to strike a happier tone with them." +
      " Last reminder: You are here today to assess the user on their behavior through a behavioral test. ONLY act as the interview and AWAIT THEIR MESSAGE."
    };
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
      <div className="chat-container" hidden>
        {messages.map((message, index) => (
          <div key={index} className={message.role === "user" ? 'user-message' : 'ai-message'}>
            {message.content}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', top: 10, right: 10, color: 'white' }}>
        <p>{Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
      </div>
    </div>
  );
};

export default ChatBox;
