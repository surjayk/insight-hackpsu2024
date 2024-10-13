import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import Lottie from 'lottie-react';
import logoAnimation from '../assets/insight_logo_anim.json';
import { InsertDriveFile } from '@mui/icons-material';
import uploadIcon from '../assets/upload_icon.png';
import '../animations.css'; // Import the CSS with the gradient background
import axios from 'axios';

function UploadScreen({ onFileUpload, onProcessingStart }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Upload patient electronic health records below (.csv).';

  useEffect(() => {
    let index = 0;
    const typingEffect = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index + 1)); // Correctly slice up to the current index
        index++;
      } else {
        clearInterval(typingEffect); // Stop typing when fullText is fully typed
      }
    }, 50); // Typing speed in milliseconds
    return () => clearInterval(typingEffect); // Cleanup interval on unmount
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/csv': ['.csv']
    },
    onDrop: (acceptedFiles) => {
      setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  const handleSubmit = () => {
    if (uploadedFiles.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadedFiles[0]); // Assuming only one file is uploaded

    // Show the processing screen
    onProcessingStart();

    // Send the file to the backend
    axios.post('http://localhost:5000/upload', formData)
      .then(response => {
        // Move to the results screen with the response data
        onFileUpload(response.data);
      })
      .catch(error => {
        console.error('There was an error uploading the file!', error);

        // Optional: Handle the error by returning to the upload screen or showing an error message
        alert('Error uploading file: ' + error.message);
        // You might want to call a function here to reset the screen
      });
  };

  return (
    <Box
      className="gradient-background" // Apply the gradient background
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Lottie Animation */}
      <Box
        sx={{
          mb: 2,
          width: '60vw', // Moderate width, 60% of the viewport width
          maxWidth: '500px', // Cap the maximum width to 500px
          height: 'auto', // Let height adjust automatically
        }}
      >
        <Lottie
          animationData={logoAnimation}
          loop={false} // Animation should play once and remain static
          style={{
            width: '100%', // Scale to the container width
            height: '100%', // Maintain aspect ratio
          }}
        />
      </Box>

      {/* Typing Animation Text */}
      <Typography
        variant="h6"
        sx={{
          mb: 3, // Adds margin-bottom to space from the dropbox
          textAlign: 'center',
          color: '#008FD5', // Text color set to #008FD5
          fontWeight: 'bold', // Make the text bold
          fontStyle: 'italic', // Make the text italic
          fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
        }}
      >
        {typedText}
      </Typography>

      {/* DropBox + Submit Button Group */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Upload Box */}
        <Box
          {...getRootProps()}
          sx={{
            border: '3px dashed #007FFF',
            borderColor: 'rgba(0, 127, 255, 0.3)', // Reduced opacity on border
            borderRadius: '15px',
            padding: '30px',
            width: '60%',
            maxWidth: '500px',
            height: '300px', // Fixed height for dropbox
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            cursor: 'pointer',
            mb: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: uploadedFiles.length > 0 ? 'flex-start' : 'center',
            alignItems: 'center', // Center the content inside the dropbox
            overflowY: 'auto', // Enable vertical scrolling when needed

            /* Inner shadow to create depth */
            boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)', // Inner shadow for depth
          }}
        >
          <input {...getInputProps()} />
          {uploadedFiles.length === 0 ? (
            // Show the upload icon with reduced opacity if no files uploaded
            <img
              src={uploadIcon}
              alt="Upload Icon"
              style={{
                width: '150px', // Set the image width
                opacity: 0.5, // Reduce opacity
              }}
            />
          ) : (
            <Box sx={{ width: '100%' }}>
              {uploadedFiles.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    marginBottom: '8px',
                    borderRadius: '10px',
                    backgroundColor: '#f5f5f5', // Light grey background for file cards
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease-in-out',
                    ':hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <InsertDriveFile
                    sx={{ color: '#007FFF', marginRight: '10px' }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ flexGrow: 1, fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif' }} // San Francisco font stack
                  >
                    {file.name}
                  </Typography>
                </Box>
              ))}
              {/* Centered text after files are uploaded */}
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  opacity: 0.6,
                  textAlign: 'center', // Centering the text
                  fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
                }}
              >
                Drag and drop more files, or click to add more
              </Typography>
            </Box>
          )}
        </Box>

        {/* Disclaimer */}
        <Typography
          variant="body2"
          sx={{
            color: 'gray',
            fontStyle: 'italic',
            marginTop: 2,
            marginBottom: 2, // Space between disclaimer and submit button
            textAlign: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
          }}
        >
          All patient data is processed locally and is not stored or shared.
        </Typography>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            padding: '15px 50px',
            fontSize: '18px',
            backgroundColor: '#008FD5',
            borderRadius: '10px',
            width: '60%',
            maxWidth: '500px',
            ':hover': {
              backgroundColor: '#0073aa',
            },
          }}
          disabled={uploadedFiles.length === 0} // Disable the button if no files are uploaded
          onClick={handleSubmit} // Trigger the file upload to backend
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default UploadScreen;
