import React from 'react';
import TrainingCard from '../trainingCard/TrainingCard';
import { Box } from '@mui/material';
import "./TrainingList.css";


const TrainingList = ({ courses, onFavoriteToggle }) => {
    return (
      <Box
      className="traning-list"
      >
        {courses?.map((course) => (
          <TrainingCard key={course.id} course={course} onFavoriteToggle={onFavoriteToggle} />
        ))}
      </Box>
    );
  };

  export default TrainingList;