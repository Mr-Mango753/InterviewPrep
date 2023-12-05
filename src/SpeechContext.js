// SpeechContext.js

import { createContext, useContext, useState } from 'react';

const SpeechContext = createContext();

export const SpeechProvider = ({ children }) => {
  const [userSpeech, setUserSpeech] = useState('');

  const value = {
    userSpeech,
    setUserSpeech,
  };

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
};

export const useSpeechContext = () => {
  return useContext(SpeechContext);
};