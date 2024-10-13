import React, { useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import logo from '../assets/insight_logo.png';
import '../animations.css';

function UploadScreen({ onFileUpload }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
    },
    onDrop: (acceptedFiles) => {
      console.log('Files uploaded:', acceptedFiles);
      setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '20px',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          mb: 4,
        }}
      >
        <img
          src={logo}
          alt="Insight Logo"
          style={{
            width: '300px',
            filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))',
          }}
        />
      </Box>

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
            borderRadius: '15px',
            padding: '60px',
            width: '60%',
            maxWidth: '500px',
            height: '300px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            mb: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <input {...getInputProps()} />
          {uploadedFiles.length === 0 ? (
            <Typography
              variant="h6"
              sx={{
                opacity: 0.6,
              }}
            >
              Please upload patient records (.csv or .pdf)
            </Typography>
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography variant="subtitle1">Uploaded Files:</Typography>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>
                    <Typography variant="body1">{file.name}</Typography>
                  </li>
                ))}
              </ul>
              <Typography variant="body2" sx={{ mt: 2, opacity: 0.6 }}>
                Drag and drop more files here, or click to select files
              </Typography>
            </Box>
          )}
        </Box>

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
          onClick={() => onFileUpload(uploadedFiles)}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default UploadScreen;
