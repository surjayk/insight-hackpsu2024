import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

function ResultsScreen() {
  // Use the fake JSON data directly in the component
  const fakeResults = {
    prepTime: "15 minutes",
    schedule: "Tomorrow at 10:30 AM",
    complex: "Yes",
    summary: "The patient has a history of hypertension and diabetes, requiring close monitoring of their medication."
  };

  const { prepTime, schedule, complex, summary } = fakeResults;

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Patient Case Results
      </Typography>
      <Box sx={{ mt: 4, textAlign: 'left' }}>
        <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Preparation Time:
          </Typography>
          <Typography variant="body1">{prepTime}</Typography>
        </Paper>

        <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Suggested Schedule:
          </Typography>
          <Typography variant="body1">{schedule}</Typography>
        </Paper>

        <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Complexity of Case:
          </Typography>
          <Typography variant="body1">{complex}</Typography>
        </Paper>

        <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Summary:
          </Typography>
          <Typography variant="body1">{summary}</Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default ResultsScreen;
