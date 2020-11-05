import logo from './logo.svg';
import './App.css';
import { useFeatureFlag } from './FeatureFlag';

function App() {
  const showIcon = useFeatureFlag('showIcon');
  const lightMode = useFeatureFlag('lightMode');

  return (
    <div className="App">
      <header className={`App-header${lightMode ? ' light' : ''}`}>
        {showIcon && <img src={logo} className="App-logo" alt="logo" style={{ alignSelf: showIcon }} />}
      </header>
    </div>
  );
}

export default App;
