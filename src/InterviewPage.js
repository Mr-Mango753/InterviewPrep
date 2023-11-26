import React, { useState, useEffect } from 'react';
import CameraComponent from './components/CameraComponent';
import ChatBox from './ChatBox';
import Button from './components/Button.jsx';
import VoiceToText from './components/VoiceToText.jsx';
import Evaluation from './components/Evaluation';

const InterviewPage = () => {
  // Keep Track of interview state
  const [interviewInProgress, setInterviewInProgress] = useState(true);
  // Entire Interview Conversation for evaluation
  const [messages, setMessages] = useState([]);
  // GPT output?
  const [transcript, setTranscript] = useState('');
  // User Input for GPT?
  const [userSpeech, setUserSpeech] = useState('');

  useEffect(() => {
    console.log("full Conversation", interviewInProgress, messages);
  }, [interviewInProgress, messages]);

  console.log("Interview page is loading");

  return (
    <div className="App">
      <header className="App-header">
        {interviewInProgress ? (
          <>
            <ChatBox setTranscript={setTranscript} userSpeech={userSpeech} messages={messages} setMessages={setMessages}/>
            <CameraComponent />
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