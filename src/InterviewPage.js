import React, { useState, useEffect } from 'react';
import CameraComponent from './components/CameraComponent';
import ChatBox from './ChatBox';
import Button from './components/Button.jsx';
import VoiceToText from './components/VoiceToText.jsx';
import Evaluation from './components/Evaluation';
import './App.css';

const InterviewPage = ({ initialContext, setTranscript, userSpeech, messages, setMessages, setUserSpeech, setInterviewInProgress, interviewInProgress, transcript }) => {

  useEffect(() => {
    console.log("full Conversation", interviewInProgress, messages);
  }, [interviewInProgress, messages]);

  console.log("Interview page is loading");

  return (
    <div className="App">
      <header className="App-header">
        {interviewInProgress ? (
          <>
            <CameraComponent />
            <ChatBox initialContext={initialContext} setTranscript={setTranscript} userSpeech={userSpeech} messages={messages} setMessages={setMessages}/>
            <Button setInterviewInProgress={setInterviewInProgress}/>
            <VoiceToText transcript={transcript} setTranscript={setTranscript} setUserSpeech={setUserSpeech} userSpeech={userSpeech} />
          </>
        ) : (
          <Evaluation messages={messages}/>
        )}
      </header>
    </div>
  );
};

export default InterviewPage;
