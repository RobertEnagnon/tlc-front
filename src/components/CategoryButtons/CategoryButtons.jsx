import React from 'react';
import { Box, Button } from '@mui/material';

const CategoryButtons = ({ categories, onCategoryNameSelect }) => {
  
  return (
    <Box mt={4}>
      {categories?.map((category) => (
        <Button
          key={category.id}
          variant="outlined"
        //   color="info"
        className='btnSubCategory'    
          sx={{ mx: 2, my: 1 }}
          onClick={() => onCategoryNameSelect(category.name)}
        >
          {category.name}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryButtons;
