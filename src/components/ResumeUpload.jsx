import React, { useState } from 'react';
import mammoth from 'mammoth';

const ResumeUpload = () => {
  const [docxFile, setDocxFile] = useState(null);
  const [docxText, setDocxText] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setDocxFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        const arrayBuffer = e.target.result;

        mammoth.extractRawText({ arrayBuffer: arrayBuffer })
          .then((result) => {
            setDocxText(result.value); 
          })
          .catch((error) => {
            console.error('Error parsing .docx file:', error);
          });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSubmit = () => {
    console.log(docxText);
    alert('Text data is logged to the console.');
  };

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      {docxFile && (
        <div>
          <button onClick={handleSubmit}>Submit Document</button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
