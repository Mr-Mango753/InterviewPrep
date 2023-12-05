import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import ResumeUpload from './components/ResumeUpload.jsx';
import InitialChatBox from './InitialChatBox.js';
import './CategoryAndResumePage.css'; 

const CategoryAndResumePage = ({ setDocxText, docxText, initialContext, setInitialContext }) => {
  // Keep Track of interview state
  
  //const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const navigate = useNavigate(); // Updated to useNavigate

  // const handleUploadSuccess = () => {
  //   setIsResumeUploaded(true);
  // };
  
  useEffect(() => {
    // Check if resume is uploaded and a category is selected
    if (initialContext) /* and category is selected, if you manage category state here */ 
    {
      navigate('/interview'); // Updated to use navigate
    }
  }, [initialContext, navigate]);

  console.log("Category and Resume page is loading");

  return (
    <div classname="category-and-resume-page">
      <img src={`${process.env.PUBLIC_URL}/AILOGO2.png`} alt="Logo" style={{ verticalAlign: 'middle', maxWidth: '50px', height: 'auto' }} />
      <h1>InterviewPrep AI</h1>
      <p>Select a category, upload your resume, and start the interview preparation!</p>

      <div className="chat-section">
      <InitialChatBox docxText={docxText} initialContext={initialContext} setInitialContext={setInitialContext}/>
      </div>
      <br/>
      <div className="upload-section">
        <ResumeUpload setDocxText={setDocxText} docxText={docxText}/>
      </div>
    </div>
  );
};

export default CategoryAndResumePage;
