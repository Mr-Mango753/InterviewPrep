
import React, {useState} from "react";

function TextLine() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();
      
      if (inputValue.trim() !== '') {
        setMessages(prevMessages => [...prevMessages, inputValue]);
        setInputValue(''); // Clear the input after submitting
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type here..."
          />
          <button type="submit">Enter</button>
        </form>
        <div>
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </div>
    );
  }
  
  export default TextLine;