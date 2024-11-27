import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function RelatedTutorials({ tutorials }) {
  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Tutoriels associés
      </Typography>
      {tutorials.map((relatedTutorial) => (
        <Box key={relatedTutorial.id} sx={{ mb: 2 }}>
          <Link to={`/tutoriels/show/${relatedTutorial.id}`}>
            <Typography variant="subtitle2">{relatedTutorial.title}</Typography>
          </Link>
        </Box>
      ))}
    </Paper>
  );
}