import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

export default function TutorialHeader({ title, videoUrl }) {
  return (
    <>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        {title}
      </Typography>
      <Paper elevation={3} sx={{ mb: 4, overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
          <iframe
            src={videoUrl}
            title="Tutorial video"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Paper>
    </>
  );
}