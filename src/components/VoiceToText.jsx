import React, { useState } from 'react';

const VoiceToText = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);

    const handleStart = () => {
        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.onstart = () => setIsListening(true);
            recognition.onresult = (event) => {
                setTranscript(event.results[0][0].transcript);
                setIsListening(false);
            };
            recognition.onend = () => setIsListening(false);

            recognition.start();
        } else {
            alert("Your browser does not support the Web Speech API. Please try a different browser.");
        }
    };

    return (
        <div>
            <button className="voice-to-text-button" onClick={handleStart}>
                {isListening ? 'Listening...' : 'Start Listening'}
            </button>
            <textarea value={transcript} readOnly placeholder="Transcription will appear here..."></textarea>
        </div>
    );
}

export default VoiceToText;
