// import React, { useEffect, useState } from 'react';
// import { Box, Grid, Stack, Typography } from '@mui/material';
// import TutorialItem from '../tutorialItem/TutorialItem';
// import SearchBar from '../searchBar/SearchBar';

// import './TutorialList.css';
// import TutorialFilter from '../tutorialFilter/TutorialFilter';


// const TutorialList = () => {

//   let [tutorials, setTutorials] = useState([]);


//    // récuperer de données de tutoriels
//   useEffect(() => {
//     fetch(process.env.REACT_APP_API_URL + "/tutorials")
//       .then((res) => res.json())
//       .then(data => {
//         setTutorials([...data]);
//         console.log(tutorials);
//       }).catch(error => {
//         console.log(error);
//       })
//   },[tutorials])

//   const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
//   const technologies = ['React', 'Vue', 'Angular', 'Node.js', 'Python'];

//   const handleFilter = (level, technology) => {
//     // Effectuer une action de filtrage en fonction du niveau et de la technologie sélectionnés
//     console.log('Niveau sélectionné:', level);
//     console.log('Technologie sélectionnée:', technology);
//     // ...
//   };


//   const handleSearch = (searchTerm) => {
//     // Effectuer une action de recherche avec le terme saisi
//     console.log('Recherche:', searchTerm);
//     if (searchTerm) {
//       let tuto = tutorials.filter(tutorial => tutorial.title.includes(searchTerm) || tutorial.category.includes(searchTerm));
//       setTutorials([...tuto]);
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1, mt: '70px' }} className="tutorialList mainBg">
//       <Box className="banniere" display={'flex'}
//         alignItems={'start'} justifyContent={'flex-start'} flexWrap={'wrap'}
//         p={10} mb={5} sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <TutorialFilter levels={levels} technologies={technologies} onFilter={handleFilter} />
//         <Box mb={5} ml={{ md: 'auto' }}>
//           <SearchBar onSearch={handleSearch} />
//         </Box>
//       </Box>
//       <Grid container spacing={2} px={{ xs: 4 }} justifyContent={'end'} >
//         <Stack ml={2} mr={'auto'} width={{ xs: "100%", sm: "100%", md: "60%", lg: "45%" }} >
//           <Typography variant="h4" gutterBottom>
//             Liste des Tutoriels
//           </Typography>
//           <Box pr={{ md: 10 }} pb={5} className="p">
//             Envie d'apprendre de nouvelles choses et maitriser de nouvelles technologies ?
//             Une explication pédagogique avec une vitesse de votre compréhension et une méthode
//             appréciée par une comunauté très habile. Alors vous et nous avons de chemin à faire ensemble...
//           </Box>
//         </Stack>
//         {tutorials.length > 0 ? (tutorials.map((tutorial) => (
//           <TutorialItem tutorial={tutorial} key={tutorial.id} />
//         ))) : <Box className="p">Aucun tutoriel pour le moment...</Box>}
//       </Grid>
//     </Box>
//   );
// };


// export default TutorialList;




import React, { useEffect, useState, useCallback } from 'react';
import "./TutorialList.css"
import {
  Box,
  Grid,
  Typography,
  Container,
  Pagination,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import TutorialItem from '../tutorialItem/TutorialItem';
import SearchBar from '../searchBar/SearchBar';
import TutorialFilter from '../tutorialFilter/TutorialFilter';
import { useTheme } from '@mui/material/styles';

const TutorialList = () => {
  const theme = useTheme();
  const [tutorials, setTutorials] = useState([]);
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const itemsPerPage = 9;

  const fetchTutorials = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tutorials`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des tutoriels');
      }
      const data = await response.json();
      const tutorialsArray = Array.isArray(data) ? data : [];
      // console.log("********************************");
      console.log(tutorialsArray);
      setTutorials(tutorialsArray);
      const calculatedTotalPages = Math.max(1, Math.ceil(tutorialsArray.length / itemsPerPage));
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    fetchTutorials();
  }, [fetchTutorials]);

  useEffect(() => {
    const filtered = tutorials.filter(tutorial =>
      (selectedLevel ? tutorial?.level.title.toLowerCase() === selectedLevel.toLowerCase() : true) &&
      (selectedTechnology ? tutorial.technologies.includes(selectedTechnology) : true) &&
      (searchTerm ? tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );
    setFilteredTutorials(filtered);
  }, [tutorials, selectedLevel, selectedTechnology, searchTerm]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilter = (level, technology) => {
    setSelectedLevel(level);
    setSelectedTechnology(technology);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Box className="banniere" sx={{
        // bgcolor: '#f5f5f5',
        borderRadius: 2,
        p: 3,
        mb: 4,
        boxShadow: 1
      }}>
        <Typography variant="h4" gutterBottom color="text.primary" fontWeight="bold">
          Explorez nos Tutoriels
        </Typography>
        <Typography variant="body1" paragraph color="text.white">
          Découvrez une variété de tutoriels conçus pour vous aider à maîtriser de nouvelles technologies.
          Que vous soyez débutant ou expert, notre plateforme offre des ressources adaptées à tous les niveaux.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TutorialFilter onFilter={handleFilter} />
        </Grid>
        <Grid item xs={12} md={4}>
          <SearchBar onSearch={handleSearch} suggestions={['HTML','CSS','Javascript','React', 'Next.js','Vue', 'Angular', 'Node.js','Express.js','Nest.js', 'Python','PHP', 'Laravel']} />
        </Grid>
        <Grid item xs={12} md={4}  >
          <FormControl fullWidth  >
            <InputLabel>Trier par</InputLabel>
            <Select value={sortBy} onChange={handleSortChange} sx={{backgroundColor: "#fff"}} >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="popularity">Popularité</MenuItem>
              <MenuItem value="title">Titre</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress sx={{ color: '#11998e' }} />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {filteredTutorials && filteredTutorials.length > 0 ? (
              filteredTutorials.map((tutorial) => (
                <Grid item xs={12} sm={6} md={4} key={tutorial.id} >
                  <TutorialItem tutorial={tutorial} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  Aucun tutoriel ne correspond à vos critères de recherche.
                </Typography>
              </Grid>
            )}
          </Grid>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Number.isInteger(totalPages) ? totalPages : 1}
              page={page}
              onChange={handlePageChange}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#264653',
                },
                '& .Mui-selected': {
                  backgroundColor: '#11998e',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#108643',
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default TutorialList;