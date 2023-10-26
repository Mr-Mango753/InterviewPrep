import React, { useState, useRef } from 'react';

const VoiceToText = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [audioFile, setAudioFile] = useState(null);

    const handleTranscriptChange = (e) => {
        setTranscript(e.target.value);
    };

    const recognitionRef = useRef(null);  // Using useRef for recognition

    const handleStop = () => {
        setIsListening(false);
        if (recognitionRef.current) {
            recognitionRef.current.onresult = null;  // Ensure no more results are processed
            recognitionRef.current.stop();
        }
    };

    const handleStart = () => {
        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!recognitionRef.current) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = true;
                recognitionRef.current.interimResults = true;
            }

            recognitionRef.current.onstart = () => setIsListening(true);

            recognitionRef.current.onresult = (event) => {
                let finalTranscript = '';
                for (let i = 0; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                setTranscript(finalTranscript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Error occurred in recognition:", event.error);
            };

            recognitionRef.current.start();
        } else {
            alert("Your browser does not support the Web Speech API. Please try a different browser.");
        }
    };
    

    const handleGenerateAudio = async () => {
        sendTranscriptToBackend(transcript);
    };

    // const sendTranscriptToBackend = async (text) => {
    //     const backendUrl = 'http://127.0.0.1:5001/generate_audio';

    //     try {
    //         const response = await fetch(backendUrl, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ text: text })
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
    //         }

    //         const responseData = await response.json();
    //         setAudioFile(responseData.audio_file);

    //     } catch (error) {
    //         console.error('Error sending transcript to backend:', error);
    //     }
    // };
    
    const sendTranscriptToBackend = async (text) => {
        const apiUrl = "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM";
        const payload = {
            "text": text,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
                "stability": 0,
                "similarity_boost": 0,
                "style": 0,
                "use_speaker_boost": true
            }
        };

        const headers = {
            "Content-Type": "application/json",
            "xi-api-key": "a01736e0fb896743c95ad0c1e818bd28"
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioFile(audioUrl);
            console.log('Response:', response);
            console.log('Audio Blob:', audioBlob);
            console.log('Audio URL:', audioUrl);

        } catch (error) {
            console.error('Error sending transcript to Eleven Labs:', error);
        }
    };

    return (
        <div>
            <button className="voice-to-text-button" onClick={isListening ? handleStop : handleStart}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <textarea 
                onChange={handleTranscriptChange}  
                value={transcript} 
                placeholder="Transcription will appear here..."
            ></textarea>
            
            {transcript && (
                <button onClick={handleGenerateAudio}>
                    Generate Audio
                </button>
            )}
    
            {audioFile && (
                <div>
                    <h3>Your Generated Audio File:</h3>
                    <audio controls src={audioFile}>
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            )}
        </div>
    );
    
};

export default VoiceToText;
