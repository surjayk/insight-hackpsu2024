import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

function UploadScreen({ onFileUpload }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // Normally handle file upload here, but for now we'll simulate
      console.log('Files uploaded:', acceptedFiles);
    }
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Readycare
      </Typography>
      <Typography variant="h6" gutterBottom>
        Upload Patient EMR
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #007FFF',
          padding: '20px',
          cursor: 'pointer',
          mt: 4,
          borderRadius: '10px',
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1">
          Drag and drop files here, or click to select files
        </Typography>
      </Box>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ mt: 4 }}
        onClick={() => onFileUpload()} // Call the onFileUpload function when clicked
      >
        Submit
      </Button>
    </Container>
  );
}

export default UploadScreen;
