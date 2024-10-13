import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import Lottie from 'lottie-react';
import logoAnimation from '../assets/insight_logo_anim.json';
import '../animations.css'; // Import the CSS with the gradient background
import { Assignment, Assessment, DoneAll } from '@mui/icons-material'; // Icons for the categories

function ResultsScreen({ onBackToUpload, resultData }) {
  // Ensure hooks are called unconditionally
  const [typedText, setTypedText] = useState('');
  const fullText = "Here's the";

  useEffect(() => {
    let index = 0;
    const typingEffect = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingEffect);
      }
    }, 50); // Typing speed in milliseconds
    return () => clearInterval(typingEffect);
  }, []);

  // If resultData is null or undefined, render fallback message
  if (!resultData) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', marginTop: '20px' }}>
        No data available. Please upload a file.
      </Typography>
    );
  }

  // Extract the necessary data from resultData
  const { summary, complexity } = resultData;
  
  // Parse the complexity data if it is a JSON string
  let complexityParsed;
  try {
    complexityParsed = typeof complexity === 'string' ? JSON.parse(complexity) : complexity;
  } catch (error) {
    console.error('Failed to parse complexity data:', error);
    complexityParsed = null;
  }

  // Handle the first complexity entry from the array
  const complexityData = Array.isArray(complexityParsed) && complexityParsed.length > 0 ? complexityParsed[0] : null;
  const isComplex = complexityData?.Predicted_Flagged_Complex ? 'Yes' : 'No';
  const complexityProbability = complexityData?.Predicted_Probability || 'N/A';
  const patientSummary = summary?.summary || 'No summary available';

  // Conclusion message based on complexity
  const conclusionMessage = isComplex === 'Yes'
    ? "Additional time is required for this patient due to the complexity of the case."
    : "Please schedule as normal for this patient.";

  return (
    <Box
      className="gradient-background"
      sx={{
        minHeight: '100vh',
        paddingTop: 4,
        paddingBottom: 4,
        textAlign: 'center',
      }}
    >
      {/* Typing Text */}
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: '#008FD5',
          fontWeight: 'bold',
          fontStyle: 'italic',
          fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
        }}
      >
        {typedText}
      </Typography>

      {/* Animated Logo */}
      <Box
        sx={{
          mb: 2,
          width: '30vw',
          maxWidth: '200px',
          height: 'auto',
          margin: '0 auto',
        }}
      >
        <Lottie
          animationData={logoAnimation}
          loop={false}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      <Container maxWidth="md" sx={{ mt: 2 }}>
        {/* Assessment Date */}
        <Typography
          variant="subtitle1"
          sx={{
            color: 'gray',
            mb: 4,
            fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
          }}
        >
          Assessment conducted on: {new Date().toLocaleString()}
        </Typography>

        {/* Complexity of Case */}
        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={3}
            sx={{
              padding: '16px',
              marginBottom: '16px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '15px',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)', // Inner shadow
            }}
          >
            <Assignment sx={{ fontSize: 40, color: '#008FD5', mb: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
              }}
            >
              Complexity of Case
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: isComplex === 'Yes' ? 'red' : 'green',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
              }}
            >
              {isComplex}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'gray',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
              }}
            >
              Probability: {complexityProbability}
            </Typography>
          </Paper>
        </Box>

        {/* Patient Summary */}
        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={3}
            sx={{
              padding: '16px',
              marginBottom: '16px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '15px',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)', // Inner shadow
            }}
          >
            <Assessment sx={{ fontSize: 40, color: '#008FD5', mb: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
              }}
            >
              Patient Summary
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
              }}
            >
              {patientSummary}
            </Typography>
          </Paper>
        </Box>

        {/* Conclusion Section */}
        <Box sx={{ mt: 4 }}>
          <Paper
            elevation={3}
            sx={{
              padding: '16px',
              backgroundColor: isComplex === 'Yes' ? '#fff0f0' : '#f0fff0', // Greenish for non-complex cases
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '15px',
              boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)', // Inner shadow
            }}
          >
            <DoneAll sx={{ fontSize: 40, color: '#008FD5', mb: 2 }} />
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
              }}
            >
              Conclusion
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isComplex === 'Yes' ? 'red' : 'green',
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Segoe UI", "Arial", sans-serif', // San Francisco font stack
              }}
            >
              {conclusionMessage}
            </Typography>
          </Paper>
        </Box>

        {/* Back to Upload Button */}
        <Box sx={{ mt: 4 }}>
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
            onClick={onBackToUpload} // Trigger the callback passed in via props
          >
            Back to Upload
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ResultsScreen;