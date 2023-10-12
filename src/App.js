import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam';
import CameraComponent from './CameraComponent';
import ChatBox from './ChatBox';
import Button from './components/Button.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatBox />
        <CameraComponent />
        <Button />
      </header>
    </div>
  );
}

export default App;
