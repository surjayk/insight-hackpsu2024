import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { PuffLoader } from 'react-spinners';

function ProcessingScreen() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Analyzing Patient Records...
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <PuffLoader size={100} color="#007FFF" loading={true} />
      </Box>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This may take a few moments.
      </Typography>
    </Container>
  );
}

export default ProcessingScreen;
