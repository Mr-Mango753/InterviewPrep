import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam';
import CameraComponent from './CameraComponent';
import ChatBox from './ChatBox';
import Button from './components/Button.jsx'
import VoiceToText from './components/VoiceToText';
import React from 'react';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatBox />
        <CameraComponent />
        <Button />
        <VoiceToText />
      </header>
    </div>
  );
}

export default App;
