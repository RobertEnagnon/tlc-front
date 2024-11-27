// import React, { useState, useEffect } from 'react';
// import { 
//   TextField, 
//   IconButton, 
//   InputAdornment, 
//   Popper, 
//   Paper, 
//   List, 
//   ListItem, 
//   ListItemText,
//   Fade,
//   useMediaQuery
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import ClearIcon from '@mui/icons-material/Clear';
// import { useTheme } from '@mui/material/styles';

// // Styled components for custom styling
// const SearchContainer = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: theme.palette.background.default,
//   '&:hover': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(TextField)(({ theme }) => ({
//   color: 'inherit',
//   // width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

// const SearchBar = ({ onSearch, suggestions = [] }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     if (searchTerm) {
//       const filtered = suggestions.filter(item =>
//         item.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredSuggestions(filtered);
//     } else {
//       setFilteredSuggestions([]);
//     }
//   }, [searchTerm, suggestions]);

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//     setAnchorEl(event.currentTarget);
//   };

//   const handleSearch = () => {
//     onSearch(searchTerm);
//     setAnchorEl(null);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleClear = () => {
//     setSearchTerm('');
//     onSearch('');
//     setAnchorEl(null);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchTerm(suggestion);
//     onSearch(suggestion);
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl) && filteredSuggestions.length > 0;

//   return (
//     <SearchContainer>
//       <SearchIconWrapper>
//         {/* <SearchIcon /> */}
//       </SearchIconWrapper>
//       <StyledInputBase
//         placeholder={isMobile ? "Rechercher..." : "Rechercher un tutoriel..."}
//         value={searchTerm}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//         fullWidth
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               {searchTerm && (
//                 <IconButton
//                   aria-label="clear search"
//                   onClick={handleClear}
//                   edge="end"
//                 >
//                   <ClearIcon />
//                 </IconButton>
//               )}
//               <IconButton color="primary" onClick={handleSearch} edge="end">
//                 <SearchIcon />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//       <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition>
//         {({ TransitionProps }) => (
//           <Fade {...TransitionProps} timeout={350}>
//             <Paper elevation={3}>
//               <List>
//                 {filteredSuggestions.map((suggestion, index) => (
//                   <ListItem
//                     button
//                     key={index}
//                     onClick={() => handleSuggestionClick(suggestion)}
//                   >
//                     <ListItemText primary={suggestion} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Fade>
//         )}
//       </Popper>
//     </SearchContainer>
//   );
// };

// export default SearchBar;

import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  IconButton, 
  InputAdornment, 
  Popper, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Fade,
  useMediaQuery,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@mui/material/styles';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(TextField)(({ theme, isExpanded }) => ({
  color: 'inherit',
  width: isExpanded ? '100%' : '40px',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.standard,
  }),
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const SearchBar = ({ onSearch, suggestions = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (searchTerm) {
      const filtered = suggestions.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm, suggestions]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setAnchorEl(event.currentTarget);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
    setAnchorEl(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    setAnchorEl(null);
    setIsExpanded(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
    setAnchorEl(null);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const open = Boolean(anchorEl) && filteredSuggestions.length > 0;

  return (
    <SearchContainer>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isExpanded && (
          <IconButton onClick={toggleExpand}>
            <SearchIcon />
          </IconButton>
        )}
        {isExpanded && (
          <>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={isMobile ? "Rechercher..." : "Rechercher un tutoriel..."}
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              fullWidth
              isExpanded={isExpanded}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {searchTerm && (
                      <IconButton
                        aria-label="clear search"
                        onClick={handleClear}
                        edge="end"
                      >
                        <ClearIcon />
                      </IconButton>
                    )}
                    <IconButton color="primary" onClick={handleSearch} edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
      </Box>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper elevation={3}>
              <List>
                {filteredSuggestions.map((suggestion, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <ListItemText primary={suggestion} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Fade>
        )}
      </Popper>
    </SearchContainer>
  );
};

export default SearchBar;