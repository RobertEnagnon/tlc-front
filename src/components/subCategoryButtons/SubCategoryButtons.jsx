import React from 'react';
import { Box, Button } from '@mui/material';

const SubCategoryButtons = ({ subCategories, onSubCategorySelect }) => {
  return (
    <Box mt={4}>
      {subCategories.map((subCategory) => (
        <Button
          key={subCategory}
          variant="outlined"
        //   color="info"
        className='btnSubCategory'    
          sx={{ mx: 2, my: 1 }}
          onClick={() => onSubCategorySelect(subCategory)}
        >
          {subCategory}
        </Button>
      ))}
    </Box>
  );
};

export default SubCategoryButtons;
