import React, { useState } from 'react';
import mammoth from 'mammoth';

const ResumeUpload = ({setDocxText, docxText}) => {
  const [docxFile, setDocxFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setDocxFile(file);
    }
  };

  const handleSubmit = () => {
    if (docxFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const arrayBuffer = e.target.result;

        mammoth.extractRawText({ arrayBuffer: arrayBuffer })
          .then((result) => {
            setDocxText(result.value);
            console.log(result.value);
            alert('Text data is logged to the console.');
          })
          .catch((error) => {
            console.error('Error parsing .docx file:', error);
          });
      };

      reader.readAsArrayBuffer(docxFile);
    }
  };

  console.log("Resume upload page is loading");

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
