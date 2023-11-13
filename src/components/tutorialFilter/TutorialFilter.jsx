import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const FilterContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
});

const FilterSelect = styled(Select)({
  marginLeft: '8px',
  width: '200px',
});

const TutorialFilter = ({ levels, technologies, onFilter }) => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    onFilter(event.target.value, selectedTechnology);
  };

  const handleTechnologyChange = (event) => {
    setSelectedTechnology(event.target.value);
    onFilter(selectedLevel, event.target.value);
  };

  return (
    <FilterContainer sx={{ display: 'flex', flexWrap: 'wrap'}}>
      <FormControl sx={{mb:2}} >
        <InputLabel>Niveau</InputLabel>
        <FilterSelect
          value={selectedLevel}
          onChange={handleLevelChange}
        >
          <MenuItem value="">Tous les niveaux</MenuItem>
          {levels.map((level) => (
            <MenuItem key={level} value={level}>{level}</MenuItem>
          ))}
        </FilterSelect>
      </FormControl>
      <FormControl sx={{mb:2}}>
        <InputLabel>Technologie</InputLabel>
        <FilterSelect
          value={selectedTechnology}
          onChange={handleTechnologyChange}
        >
          <MenuItem value="">Toutes les technologies</MenuItem>
          {technologies.map((technology) => (
            <MenuItem key={technology} value={technology}>{technology}</MenuItem>
          ))}
        </FilterSelect>
      </FormControl>
    </FilterContainer>
  );
};

export default TutorialFilter;
