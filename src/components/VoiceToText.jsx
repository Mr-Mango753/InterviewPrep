import React, { useState } from 'react';

const VoiceToText = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [audioFile, setAudioFile] = useState(null);

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

    const handleGenerateAudio = async () => {
        sendTranscriptToBackend(transcript);
    };

    const sendTranscriptToBackend = async (text) => {
        const backendUrl = 'http://127.0.0.1:5000/generate_audio';

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: text })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
            }

            const responseData = await response.json();
            setAudioFile(responseData.audio_file);

        } catch (error) {
            console.error('Error sending transcript to backend:', error);
        }
    };

    return (
        <div>
            <button className="voice-to-text-button" onClick={handleStart}>
                {isListening ? 'Listening...' : 'Start Listening'}
            </button>
            <textarea value={transcript} readOnly placeholder="Transcription will appear here..."></textarea>
            
            {transcript && (
                <button onClick={handleGenerateAudio}>
                    Generate Audio
                </button>
            )}

            {audioFile && (
                <div>
                    <h3>Your Generated Audio File:</h3>
                        <audio controls src={`http://127.0.0.1:5000/simple_test`}>
                            Your browser does not support the audio tag.
                        </audio>
                </div>
            )}
        </div>
    );
};

export default VoiceToText;
