import React, { useState } from 'react';
import UploadScreen from './pages/UploadScreen';
import ProcessingScreen from './pages/ProcessingScreen';
import ResultsScreen from './pages/ResultsScreen';


function App() {
  const [currentScreen, setCurrentScreen] = useState('upload');
  const [resultData, setResultData] = useState(null);

  const handleFileUpload = (data) => {
    setResultData(data);
    setCurrentScreen('results');
  };

  const handleProcessingStart = () => {
    setCurrentScreen('processing');
  };

  const handleBackToUpload = () => {
    setResultData(null);
    setCurrentScreen('upload');
  };

  return (
    <>
      {currentScreen === 'upload' && (
        <UploadScreen
          onFileUpload={handleFileUpload}
          onProcessingStart={handleProcessingStart}
        />
      )}
      {currentScreen === 'processing' && <ProcessingScreen onCancel={handleBackToUpload} />}
      {currentScreen === 'results' && (
        <ResultsScreen onBackToUpload={handleBackToUpload} resultData={resultData} />
      )}
    </>
  );
}

export default App;