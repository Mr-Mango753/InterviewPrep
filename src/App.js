import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam';
import CameraComponent from './components/CameraComponent';
import ChatBox from './ChatBox';
import Button from './components/Button.jsx'
import VoiceToText from './components/VoiceToText.jsx';
import React, { useState } from 'react';
import axios from 'axios';

// require('dotenv').config();

function App() {

  const [transcript, setTranscript] = useState('');
  const [userSpeech, setUserSpeech] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <ChatBox setTranscript={setTranscript} userSpeech={userSpeech} />
        <CameraComponent />
        <Button />
        <VoiceToText transcript={transcript} setTranscript={setTranscript} setUserSpeech={setUserSpeech} userSpeech={userSpeech} />
      </header>
    </div>
  );
}

export default App;
