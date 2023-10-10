import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const CameraComponent = () => {
  const webcamRef = useRef(null);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        mirrored={true} // Set to true to mirror the camera view
      />
    </div>
  );
};

export default CameraComponent;