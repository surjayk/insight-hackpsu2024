import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Lottie from 'lottie-react'; // Import Lottie for animation
import '../animations.css'; // Import the CSS with the gradient background
import loadingAnimation from '../assets/loading.json'; // Adjust the path as needed for your Lottie JSON

function ProcessingScreen({ onCancel }) {
  const [typedText, setTypedText] = useState('');
  const [dots, setDots] = useState('');
  const fullText = 'Gaining insight'; // The full text without dots

  useEffect(() => {
    // Typing effect for the full text, similar to UploadScreen logic
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prevText) => fullText.slice(0, index + 1)); // Properly slice up to the index
        index++;
      } else {
        clearInterval(typingInterval); // Stop typing once the full text is typed out
      }
    }, 100);

    return () => clearInterval(typingInterval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    // Logic for the dots animation after the text is fully typed out
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) return ''; // Reset dots after 3
        return prevDots + '.'; // Add dots up to 3
      });
    }, 500); // Adjust the speed of the dots typing

    return () => clearInterval(dotsInterval); // Cleanup interval when component unmounts
  }, []);

  return (
    <Box
      className="gradient-background" // Apply the gradient background
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
      {/* Title with typing effect */}
      <Typography
        variant="h6"
        sx={{
          color: '#008FD5', // Set text color to blue
          fontWeight: 'bold', // Make the text bold
          fontStyle: 'italic', // Italicize text
          fontSize: '1.8rem', // Increase font size
          fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // Use San Francisco font stack
        }}
      >
        {typedText}
        <span>{dots}</span> {/* The dots will keep typing out */}
      </Typography>

      {/* Lottie Animation */}
      <Box
        sx={{
          mt: 4,
          width: '300px', // Increased width for the Lottie container
          height: '300px', // Increased height for the Lottie container
        }}
      >
        <Lottie
          animationData={loadingAnimation} // Use the imported Lottie file
          loop={true} // Ensure the animation loops
          style={{
            width: '100%', // Adjust to container width
            height: '100%', // Adjust to container height
          }}
        />
      </Box>

      {/* Info Text */}
      <Typography
        variant="body1"
        sx={{
          mt: 2,
          fontStyle: 'italic', // Italicize the info text
          fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // Use San Francisco font stack
        }}
      >
        This may take a few moments.
      </Typography>

      {/* Cancel Button */}
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          mt: 5,
          padding: '15px 50px',
          fontSize: '18px',
          backgroundColor: '#008FD5', // Set the cancel button to blue
          borderRadius: '10px',
          width: '60%',
          maxWidth: '500px',
          ':hover': {
            backgroundColor: '#0074B7', // Darker blue on hover
          },
        }}
        onClick={onCancel} // Trigger the cancel callback
      >
        Cancel
      </Button>
    </Box>
  );
}

export default ProcessingScreen;
