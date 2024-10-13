import React, { useState } from 'react';
import UploadScreen from './pages/UploadScreen';
import ProcessingScreen from './pages/ProcessingScreen';
import ResultsScreen from './pages/ResultsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('upload'); // Start with 'upload'

  // Function to handle file upload and move to the processing screen
  const handleFileUpload = () => {
    setCurrentScreen('processing');
    setTimeout(() => {
      setCurrentScreen('results'); // Move to results screen after delay
    }, 25000); 
  };

  // Function to navigate back to the upload screen
  const handleBackToUpload = () => {
    setCurrentScreen('upload');
  };

  // Function to handle cancellation in the processing screen
  const handleCancel = () => {
    setCurrentScreen('upload'); // Navigate back to the upload screen
  };

  return (
    <div>
      {currentScreen === 'upload' && <UploadScreen onFileUpload={handleFileUpload} />}
      {currentScreen === 'processing' && <ProcessingScreen onCancel={handleCancel} />}
      {currentScreen === 'results' && <ResultsScreen onBackToUpload={handleBackToUpload} />}
    </div>
  );
}

export default App;
