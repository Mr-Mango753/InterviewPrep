import logo from './logo.svg';
import './App.css';
import CameraComponent from './components/CameraComponent';
import ChatBox from './ChatBox';
import Button from './components/Button.jsx'
import VoiceToText from './components/VoiceToText.jsx';
import React, { useState, useEffect } from 'react';
import Evaluation from './components/Evaluation';
import ResumeUpload from './components/ResumeUpload';

function App() {

  // Keep Track of interview state
  const [interviewInProgress, setInterviewInProgress] = useState(true)
  // Entire Interview Conversation for evaluation
  const [messages, setMessages] = useState([]);
  // GPT output?
  const [transcript, setTranscript] = useState('');
  // User Input for GPT?
  const [userSpeech, setUserSpeech] = useState('');


  useEffect(() => {
    console.log("full Conversation" + interviewInProgress + messages);
  }, [interviewInProgress]);

  return (
    <div className="App">
    {interviewInProgress ? (
      <header className="App-header">
        <ChatBox setTranscript={setTranscript} userSpeech={userSpeech} messages={messages} setMessages={setMessages}/>
        <CameraComponent />
        <Button setInterviewInProgress={setInterviewInProgress}/>
        <ResumeUpload />
        <VoiceToText transcript={transcript} setTranscript={setTranscript} setUserSpeech={setUserSpeech} userSpeech={userSpeech} />
      </header>
    ) : (
      <header className='App-header'>
        <Evaluation messages={messages}/>
      </header>
    )}
    </div>
  );
}

export default App;
