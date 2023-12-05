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
            <ChatBox initialContext={initialContext} setTranscript={setTranscript} userSpeech={userSpeech} messages={messages} setMessages={setMessages}/>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <CameraComponent />
              <div>
              <iframe 
              title="External Content" 
              src="http://the-singularity-show.com/pages/CS338/interview.html" 
              width="500" 
              height="300" 
              />  
              <VoiceToText transcript={transcript} setTranscript={setTranscript} setUserSpeech={setUserSpeech} userSpeech={userSpeech} />
              </div>
            </div>
            <div>
              <Button setInterviewInProgress={setInterviewInProgress}/>
            </div>
            </>
        ) : (
          <Evaluation messages={messages}/>
        )}
      </header>
    </div>
  );
};

export default InterviewPage;
