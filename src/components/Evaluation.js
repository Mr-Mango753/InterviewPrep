import React, { useState, useEffect } from "react";
import { sendMessageToAI } from "../utils/GptAPI";

const Evaluation = ({ messages }) => {
  const [gptMessages, setGptMessages] = useState("");

  useEffect(() => {
    const createTranscript = (messages) => {
      return messages.slice(1).map((msg) => `${msg.role}: ${msg.content}`).join('\n');
    };

    const fetchEvaluation = async () => {
      const transcript = createTranscript(messages);

      const initialContext = {
        role: "system",
        content: "You are a senior software developer at a large software company. " + 
        "Evaluate the user in the interview transcript. Focus on 8 aspects in your evaluation: " +
        "Motivation, Ability to be Proactive, Able to work in an unstructured environment, Perseverance, " +
        "Empathy, and Communication."
      };

      const interviewTranscript = {
        role: "user",
        content: transcript
      };

      // Now call the API and wait for the response before setting the state
      const response = await gptCall([initialContext, interviewTranscript]);
      if (response) { // Make sure there's a response before setting state
        setGptMessages(response);
        console.log(response)
      }
    };

    fetchEvaluation();
  }, []);

  const gptCall = async (newMessages) => {
    try {
      const responseText = await sendMessageToAI(newMessages);
      return responseText;
    } catch (error) {
      console.error('Error:', error);
      return "";
    }
  };

  return (
    <div>
      {gptMessages} {/* Render the message directly as it's now a string */}
    </div>
  );
};

export default Evaluation;
