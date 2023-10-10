import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam';
import CameraComponent from './CameraComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CameraComponent />
      </header>
    </div>
  );
}

export default App;
