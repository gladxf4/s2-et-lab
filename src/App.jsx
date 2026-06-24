import { useState } from 'react';
import MarksCalculator from './components/MarksCalculator';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <MarksCalculator darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
