import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
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

  return (
    <div>
      <Webcam
        key={key}
        audio={false} // Disabling audio
        ref={webcamRef}
        mirrored={true} 
      />
      <button className="cam-mic-button" onClick={toggleCamera}>
        {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
      </button>
    </div>
  );
};

export default CameraComponent;
