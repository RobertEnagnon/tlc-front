import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const SearchInput = styled(TextField)({
  marginLeft: '8px',
  width: '200px',
});

const SearchButton = styled(IconButton)({
  marginLeft: '8px',
});

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(searchTerm);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchContainer>
      <SearchInput
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleInputChange}
        onBlur={handleInputChange}
      />
      <SearchButton color="primary" onClick={handleSearch}>
        <SearchIcon />
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
