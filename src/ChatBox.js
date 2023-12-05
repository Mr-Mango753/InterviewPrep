import React, { useState, useEffect } from 'react';
import { sendMessageToAI } from './utils/GptAPI';
//import VoiceToText, { sendTranscriptToBackend } from './components/VoiceToText.jsx';

const ChatBox = ({ initialContext, setTranscript, userSpeech, messages, setMessages, isResumeUploaded }) => {
  const [newMessage, setNewMessage] = useState('');
  var responses = 0;



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
    console.log("calling gpt api")
    const initContext = {
      "role": "system",
      "content": initialContext
    };
    console.log("init context is ", initContext);
    gptCall([initContext]); 
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

  console.log("Chatbox is loading");

  return (
    
      <div className="chat-container" hidden>
        {messages.map((message, index) => (
          <div key={index} className={message.role === "user" ? 'user-message' : 'ai-message'}>
            {message.content}
          </div>
        ))}
      </div>



  );
};

/*<div style={{ position: 'absolute', top: 10, right: 10, color: 'white' }}>
        <p>{Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</p>
      </div>*/

export default ChatBox;
