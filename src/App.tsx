import Weather from './components/Weather';
import './App.css';
import MoodDialogue from './components/MoodDialogue';

function App() {

  return (
    <div className="container">
      <Weather tempUnit="f"/>
      <MoodDialogue/>
    </div>
  );
}

export default App;
