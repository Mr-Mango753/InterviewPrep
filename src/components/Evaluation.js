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
        content: "You are a lead software engineer at a major tech company." +
        " You are being given a transcript from a recent interview between a software developer at your company and a candidate for a Software Engineering role." +
        " Evaluate the candidate based on 8 factors: Motivation, Ability to be Proactive, Able to work in an unstructured environment, Perseverance, Empathy, and Communication." +
        " You are ONLY EVALUATING the USER. You are NOT the user or the candidate or the interviewer."
      };

      const interviewTranscript = {
        role: "user",
        content: transcript
      };

      console.log([initialContext, interviewTranscript])

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
      {gptMessages}
    </div>
  );
};

export default Evaluation;
