import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam';
import CameraComponent from './CameraComponent';
import Button from './components/Button.jsx'
import VoiceToText from './components/VoiceToText';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CameraComponent />
        <Button />
        <VoiceToText />
      </header>
    </div>
  );
}

export default App;
