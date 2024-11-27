
import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import TrainingCard from '../trainingCard/TrainingCard';

const TrainingList = ({ courses, onFavoriteToggle }) => {
  if (courses.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Aucune formation trouvée
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
          <TrainingCard course={course} onFavoriteToggle={onFavoriteToggle} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TrainingList;