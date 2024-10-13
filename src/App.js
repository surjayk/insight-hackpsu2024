import React, { useState } from 'react';
import UploadScreen from './pages/UploadScreen';
import ProcessingScreen from './pages/ProcessingScreen';
import ResultsScreen from './pages/ResultsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('upload'); // Start with 'upload'

  // Function to handle file upload and move to the processing screen
  const handleFileUpload = () => {
    // Move to the processing screen
    setCurrentScreen('processing');

    // Simulate a delay before moving to the results screen
    setTimeout(() => {
      setCurrentScreen('results'); // Move to results screen
    }, 3000); // Simulate a 3-second processing time
  };

  return (
    <div>
      {currentScreen === 'upload' && <UploadScreen onFileUpload={handleFileUpload} />}
      {currentScreen === 'processing' && <ProcessingScreen />}
      {currentScreen === 'results' && <ResultsScreen />}
    </div>
  );
}

export default App;
