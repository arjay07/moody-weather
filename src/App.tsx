import MoodyWeather from './components/MoodyWeather';
import './App.css';
import './switch.css';
import { useEffect, useState } from 'react';
import environment from './environment';
import infoIcon from './assets/info.svg';

function App() {

  const [degradeMode, setDegradeMode] = useState(false);
  const { VERSION } = environment;

  const onCheckDegradeMode = (event: any) => {
    localStorage.setItem('degradeMode', JSON.stringify(event.target.checked));
    setDegradeMode(JSON.parse(localStorage.getItem('degradeMode')!));
  };

  useEffect(() => {
    setDegradeMode(JSON.parse(localStorage.getItem('degradeMode')!));
  }, [degradeMode]);

  return (
    <div className="container">
      <div className="top-left">
        <img src={infoIcon} 
             width="20" 
             height="20"
             style={{
               padding: 5,
               opacity: 0.3
             }}
             alt="Information"/>
      </div>
      <div className="top-right" style={{ padding: 5 }}>
        <span className="degrade-mode" style={{ opacity: degradeMode ? 1 : 0 }}>Degrade me</span>
        <label className="switch">
          <input type="checkbox" 
          checked={degradeMode}
          onChange={onCheckDegradeMode}/>
          <span className="slider round"></span>
        </label>
      </div>
      <MoodyWeather tempUnit="f" degradeMode={degradeMode}/>
      <div className="bottom-left">
        <span className="copyright">
          &copy; Moody Weather 2021
        </span>
      </div>
      <div className="bottom-right">
        <span className="version">
          Version { VERSION }
        </span>
      </div>
    </div>
  );
}

export default App;
