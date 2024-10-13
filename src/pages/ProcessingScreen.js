import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Lottie from 'lottie-react';
import '../animations.css';
import loadingAnimation from '../assets/loading.json';

function ProcessingScreen({ onCancel }) {
  const [typedText, setTypedText] = useState('');
  const [dots, setDots] = useState('');
  const fullText = 'Gaining insight';

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 3 ? '' : prevDots + '.'));
    }, 500);

    return () => {
      clearInterval(dotsInterval);
    };
  }, []);

  const handleCancel = () => {
    onCancel(); // This will reset the screen to 'Upload' in the parent component
  };

  return (
    <Box
      className="gradient-background"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#008FD5',
          fontWeight: 'bold',
          fontStyle: 'italic',
          fontSize: '1.8rem',
          fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif',
        }}
      >
        {typedText}
        <span>{dots}</span>
      </Typography>

      <Box
        sx={{
          mt: 4,
          width: '300px',
          height: '300px',
        }}
      >
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      <Typography
        variant="body1"
        sx={{
          mt: 2,
          fontStyle: 'italic',
          fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif',
        }}
      >
        This may take a few moments.
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          mt: 5,
          padding: '15px 50px',
          fontSize: '18px',
          backgroundColor: '#008FD5',
          borderRadius: '10px',
          width: '60%',
          maxWidth: '500px',
          ':hover': {
            backgroundColor: '#0074B7',
          },
        }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default ProcessingScreen;