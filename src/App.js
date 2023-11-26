import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoryAndResumePage from './CategoryAndResumePage';
import InterviewPage from './InterviewPage';
// Import other components or pages if necessary

function App() {
  console.log("App is loading");
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define the route for the Category and Resume page */}
          <Route exact path="/" element={<CategoryAndResumePage />} />

          {/* Define the route for the Interview page */}
          <Route path="/interview" element={<InterviewPage />} />

          {/* You can add more routes for other components or pages here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/


// import logo from './logo.svg';
// import './App.css';
// import CameraComponent from './components/CameraComponent';
// import ChatBox from './ChatBox';
// import Button from './components/Button.jsx'
// import VoiceToText from './components/VoiceToText.jsx';
// import React, { useState, useEffect } from 'react';
// import Evaluation from './components/Evaluation';
// import ResumeUpload from './components/ResumeUpload.jsx';

// function App() {

//   // Keep Track of interview state
//   const [interviewInProgress, setInterviewInProgress] = useState(true)
//   // Entire Interview Conversation for evaluation
//   const [messages, setMessages] = useState([]);
//   // GPT output?
//   const [transcript, setTranscript] = useState('');
//   // User Input for GPT?
//   const [userSpeech, setUserSpeech] = useState('');


//   useEffect(() => {
//     console.log("full Conversation" + interviewInProgress + messages);
//   }, [interviewInProgress]);

//   return (
//     <div className="App">
//     {interviewInProgress ? (
//       <header className="App-header">
//         <ChatBox setTranscript={setTranscript} userSpeech={userSpeech} messages={messages} setMessages={setMessages}/>
//         <CameraComponent />
//         <Button setInterviewInProgress={setInterviewInProgress}/>
//         <ResumeUpload setUserSpeech={setUserSpeech}/>
//         <VoiceToText transcript={transcript} setTranscript={setTranscript} setUserSpeech={setUserSpeech} userSpeech={userSpeech} />
//         {/* <iframe src="http://the-singularity-show.com/pages/CS338/interview.html" title="talkinghead" height="500" width="500"></iframe> */}
//         {/* <object data="http://the-singularity-show.com/pages/CS338/interview.html" width="600" height="400"> */}
//           {/* <embed src="http://the-singularity-show.com/pages/CS338/interview.html" width="600" height="400"> </embed> */}
//       {/* </object> */}
//       </header>
//     ) : (
//       <header className='App-header'>
//         <Evaluation messages={messages}/>
//       </header>
//     )}
//     </div>
//   );
// }

// export default App;
