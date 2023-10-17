import React, { useState } from 'react';

const VoiceToText = () => {
    const [transcript, setTranscript] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

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

    const handleApiCall = async () => {
        const apiUrl = 'https://api.d-id.com/talks';
        const API_KEY = "YXdlc29tZWFiY2pAZ21haWwuY29t:Oe_ubfueU4Ts7aON-rFwn";  // Please secure this!
        const payload = {
            script: {
                type: "text",
                subtitles: "false",
                provider: {
                    type: "microsoft",
                    voice_id: "en-US-JennyNeural"
                },
                ssml: "false"
            },
            config: {
                fluent: "false",
                pad_audio: "0.0"
            },
            source_url: "https://www.d-id.com/wp-content/uploads/2023/07/NRtOl5zl-1.png"
        };

        payload.script.input = transcript;

        try {
            const postResponse = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${API_KEY}`
                },
                body: JSON.stringify(payload)
            });
            
            if (postResponse.ok) {  // Check if POST was successful
                
                const postData = await postResponse.json();
                console.log("TESTTTTT", postData, postData.id);
                let id = postData.id;
                let GET_apiURL = `https://api.d-id.com/talks/${id}`;
                console.log(GET_apiURL);
                setTimeout(async () => {
                    // Now proceed with the GET request
                    const getResponse = await fetch(GET_apiURL, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': `Basic ${API_KEY}`
                        },
                    });
            
                    if (getResponse.ok) {  // Check if GET was successful
                        const getData = await getResponse.json();
                        setVideoUrl(getData.result_url);
                        if (getData.status != "done") {
                            console.log(getData.audio_url, getData.source_url, videoUrl);
                        }
                    } else {
                        console.error('GET request failed:', await getResponse.text());
                    }
                }, 5000);  // 5000 milliseconds = 5 seconds delay
            
                // Now proceed with the GET request
            //     const getResponse = await fetch(GET_apiURL, {
            //         method: 'GET',
            //         headers: {
            //             'Accept': 'application/json',
            //             'Authorization': `Basic ${API_KEY}`
            //         },
            //     });

            //     if (getResponse.ok) {  // Check if GET was successful
            //         const getData = await getResponse.json();
            //         setVideoUrl(getData.result_url);
            //         if (getData.status != "done")
            //         console.log(getData.audio_url, getData.source_url, videoUrl);
            //     } else {
            //         console.error('GET request failed:', await getResponse.text());
            //     }
            } else {
                console.error('POST request failed:', await postResponse.text());
            }
        } catch (error) {
            console.error('Error during API call', error);
        }
    };

    return (
        <div>
            <button className="voice-to-text-button" onClick={handleStart}>
                {isListening ? 'Listening...' : 'Start Listening'}
            </button>
            <textarea value={transcript} readOnly placeholder="Transcription will appear here..."></textarea>
            <button onClick={handleApiCall} disabled={!transcript}>
                Get Video
            </button>
            
            {videoUrl && (
                <div>
                    <h3>Your Video:</h3>
                    <video width="320" height="240" controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
};

export default VoiceToText;
