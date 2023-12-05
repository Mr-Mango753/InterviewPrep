import React, { useState, useEffect }  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryAndResumePage from './CategoryAndResumePage';
import InterviewPage from './InterviewPage';
import './App.css';

// Import other components or pages if necessary

function App() {
  // initial context
  const [initialContext, setInitialContext] = useState('');
  // Resume text
  const [docxText, setDocxText] = useState('');
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
  }, [interviewInProgress, messages]);


  console.log("App is loading");
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the route for the Category and Resume page */}
          <Route exact path="/" element={<CategoryAndResumePage setDocxText={setDocxText} docxText={docxText} initialContext={initialContext} setInitialContext={setInitialContext} />} />

          {/* Define the route for the Interview page */}
          <Route path="/interview" element={<InterviewPage initialContext={initialContext} setInterviewInProgress={setInterviewInProgress} transcript={transcript} setTranscript={setTranscript} setUserSpeech={setUserSpeech} userSpeech={userSpeech} messages={messages} setMessages={setMessages} interviewInProgress={interviewInProgress} />} />

          {/* You can add more routes for other components or pages here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

