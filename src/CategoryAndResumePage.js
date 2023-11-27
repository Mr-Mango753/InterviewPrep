import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import ChatBox from './ChatBox';
import ResumeUpload from './components/ResumeUpload.jsx';

const CategoryAndResumePage = () => {
  // Keep Track of interview state
  //const [interviewInProgress, setInterviewInProgress] = useState(true);
  // Entire Interview Conversation for evaluation
  const [messages, setMessages] = useState([]);
  // GPT output?
  const [transcript, setTranscript] = useState('');
  // User Input for GPT?
  const [userSpeech, setUserSpeech] = useState('');
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const navigate = useNavigate(); // Updated to useNavigate

  const handleUploadSuccess = () => {
    setIsResumeUploaded(true);
  };
  
  useEffect(() => {
    // Check if resume is uploaded and a category is selected
    if (isResumeUploaded /* and category is selected, if you manage category state here */) {
      navigate('/interview'); // Updated to use navigate
    }
  }, [isResumeUploaded, navigate]);

  console.log("Category and Resume page is loading");

  return (
    <div>
      <ResumeUpload setUserSpeech={setUserSpeech} onUploadSuccess={handleUploadSuccess} />
      <ChatBox setTranscript={setTranscript} userSpeech={userSpeech} messages={messages} setMessages={setMessages} isResumeUploaded={isResumeUploaded} />
    </div>
  );
};

export default CategoryAndResumePage;
