import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import ResumeUpload from './components/ResumeUpload.jsx';
import InitialChatBox from './InitialChatBox.js';

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
    <div>
      <ResumeUpload setDocxText={setDocxText} docxText={docxText}/>
      <InitialChatBox docxText={docxText} initialContext={initialContext} setInitialContext={setInitialContext}/>
    </div>
  );
};

export default CategoryAndResumePage;
