import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [key, setKey] = useState(Date.now()); // Key to re-render Webcam

  const toggleCamera = () => {
    const { current } = webcamRef;
    if (isCameraOn && current && current.stream) {
      const videoTracks = current.stream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.stop();
      });
    } else {
      setKey(Date.now()); // Force re-render to start the camera again
    }
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    const { current } = webcamRef;
    if (isMicOn && current && current.stream) {
      const audioTracks = current.stream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.stop();
      });
    } else {
      setKey(Date.now()); // Force re-render to start the mic again
    }
    setIsMicOn(!isMicOn);
  };

  return (
    <div>
      <Webcam
        key={key}
        audio={isMicOn}
        ref={webcamRef}
        mirrored={true} 
      />
      <button className="cam-mic-button" onClick={toggleCamera}>
        {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
      </button>
      <button className="cam-mic-button" onClick={toggleMic}>
        {isMicOn ? "Turn Mic Off" : "Turn Mic On"}
      </button>
    </div>
  );
};

export default CameraComponent;
