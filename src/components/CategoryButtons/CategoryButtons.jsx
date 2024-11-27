

import React from 'react';
import { Box, Button } from '@mui/material';

const CategoryButtons = ({ categories, onCategoryNameSelect, selectedCategory }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {categories?.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.name ? "contained" : "outlined"}
          className={selectedCategory === category.name ? 'btnFirst' : 'btnSubCategory'}
          sx={{ 
            my: 1,
            textTransform: 'none',
            borderRadius: '20px',
            px: 2
          }}
          onClick={() => onCategoryNameSelect(category.name)}
        >
          {category.name}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryButtons;