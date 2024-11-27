

// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   Chip,
//   CircularProgress,
//   Alert,
//   Snackbar
// } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import TrainingBanner from '../../components/trainingBanner/TrainingBanner';
// import TrainingList from '../../components/trainingList/TrainingList';
// import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';
// import SearchBar from '../../components/searchBar/SearchBar';

// const Training = () => {
//   const theme = useTheme();
//   const [filterFree, setFilterFree] = useState(false);
//   const [filterPaid, setFilterPaid] = useState(false);
//   const [trainingData, setTrainingData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryName, setSelectedCategoryName] = useState('Toutes');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchData = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const headers = { "Content-Type": "application/json" };
//       const [trainResp, catResp] = await Promise.all([
//         fetch(`${process.env.REACT_APP_API_URL}/trainings`, { headers }),
//         fetch(`${process.env.REACT_APP_API_URL}/categories`, { headers })
//       ]);

//       if (!trainResp.ok || !catResp.ok) {
//         throw new Error('Erreur lors de la récupération des données');
//       }

//       const [trainData, catData] = await Promise.all([
//         trainResp.json(),
//         catResp.json()
//       ]);

//       setTrainingData(trainData);
//       setCategories(catData);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const onCategoryNameSelect = useCallback((categoryName) => {
//     setSelectedCategoryName(categoryName);
//   }, []);

//   const filteredCourses = trainingData.filter((course) => {
//     const categoryMatch = selectedCategoryName === 'Toutes' || course.categorie.name === selectedCategoryName;
//     const typeMatch = (!filterFree && !filterPaid) || (filterFree && course.type === 'gratuit') || (filterPaid && course.type === 'payant');
//     const searchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
//     return categoryMatch && typeMatch && searchMatch;
//   });

//   const handleFilterChange = (event, filterType) => {
//     if (filterType === 'free') {
//       setFilterFree(event.target.checked);
//     } else {
//       setFilterPaid(event.target.checked);
//     }
//   };

//   const handleFavoriteToggle = useCallback((id) => {
//     // Implement favorite toggle logic here
//     console.log(`Toggle favorite for course with id: ${id}`);
//   }, []);

//   const handleSearch = useCallback((term) => {
//     setSearchTerm(term);
//   }, []);

//   return (
//     <Box className="mainBg">
//       <TrainingBanner />
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         {isLoading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
//             <CircularProgress color={'success'} />
//           </Box>
//         ) : error ? (
//           <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
//         ) : (
//           <>
//             <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
//               <Grid item xs={12} md={6}>
//                 <Typography variant="h4" component="h1" gutterBottom color="#2C5364">
//                   Nos Formations
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary" paragraph>
//                   Explorez notre sélection de formations pour développer vos compétences
//                 </Typography>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <SearchBar onSearch={handleSearch} />
//               </Grid>
//             </Grid>

//             <Box sx={{ mb: 4 }}>
//               <CategoryButtons
//                 categories={[{ id: 'all', name: 'Toutes' }, ...categories]}
//                 onCategoryNameSelect={onCategoryNameSelect}
//                 selectedCategory={selectedCategoryName}
//               />
//             </Box>

//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//               <FormControlLabel
//                 control={<Checkbox checked={filterFree} onChange={(e) => handleFilterChange(e, 'free')} />}
//                 label="Gratuites"
//               />
//               <FormControlLabel
//                 control={<Checkbox checked={filterPaid} onChange={(e) => handleFilterChange(e, 'paid')} />}
//                 label="Payantes"
//               />
//               <Chip 
//                 label={`${filteredCourses.length} formation${filteredCourses.length > 1 ? 's' : ''}`}
//                 // color="#108643"
                
//                 sx={{ ml: 2, color: "#108643" }}
//               />
//             </Box>

//             <TrainingList courses={filteredCourses} onFavoriteToggle={handleFavoriteToggle} />
//           </>
//         )}
//       </Container>
//       <Snackbar
//         open={filteredCourses.length === 0 && !isLoading}
//         message="Aucune formation ne correspond à vos critères de recherche."
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       />
//     </Box>
//   );
// };

// export default Training;


import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TrainingBanner from '../../components/trainingBanner/TrainingBanner';
import TrainingList from '../../components/trainingList/TrainingList';
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';
import SearchBar from '../../components/searchBar/SearchBar';

const Training = () => {
  const theme = useTheme();
  const [filterFree, setFilterFree] = useState(false);
  const [filterPaid, setFilterPaid] = useState(false);
  const [trainingData, setTrainingData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('Toutes');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [sortBy, setSortBy] = useState('date');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const headers = { "Content-Type": "application/json" };
      const [trainResp, catResp] = await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/trainings`, { headers }),
        fetch(`${process.env.REACT_APP_API_URL}/categories`, { headers })
      ]);

      if (!trainResp.ok || !catResp.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const [trainData, catData] = await Promise.all([
        trainResp.json(),
        catResp.json()
      ]);

      setTrainingData(trainData);
      setCategories(catData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onCategoryNameSelect = useCallback((categoryName) => {
    setSelectedCategoryName(categoryName);
    setPage(1);
  }, []);

  const filteredCourses = trainingData.filter((course) => {
    const categoryMatch = selectedCategoryName === 'Toutes' || course.categorie.name === selectedCategoryName;
    const typeMatch = (!filterFree && !filterPaid) || (filterFree && course.type === 'gratuit') || (filterPaid && course.type === 'payant');
    const searchMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && typeMatch && searchMatch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'popularity') {
      return b.popularity - a.popularity;
    } else if (sortBy === 'rating') {
      return b.ratings - a.ratings;
    }
    return 0;
  });

  const paginatedCourses = sortedCourses.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleFilterChange = (event, filterType) => {
    if (filterType === 'free') {
      setFilterFree(event.target.checked);
    } else {
      setFilterPaid(event.target.checked);
    }
    setPage(1);
  };

  const handleFavoriteToggle = useCallback((id) => {
    // Implement favorite toggle logic here
    console.log(`Toggle favorite for course with id: ${id}`);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setPage(1);
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box className="mainBg">
      <TrainingBanner />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress color="success" />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
        ) : (
          <>
            <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h1" gutterBottom color="#2C5364">
                  Nos Formations
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Explorez notre sélection de formations pour développer vos compétences
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <SearchBar onSearch={handleSearch} />
              </Grid>
            </Grid>

            <Box sx={{ mb: 4 }}>
              <CategoryButtons
                categories={[{ id: 'all', name: 'Toutes' }, ...categories]}
                onCategoryNameSelect={onCategoryNameSelect}
                selectedCategory={selectedCategoryName}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexWrap: 'wrap' }}>
              <FormControlLabel
                control={<Checkbox checked={filterFree} onChange={(e) => handleFilterChange(e, 'free')} />}
                label="Gratuites"
              />
              <FormControlLabel
                control={<Checkbox checked={filterPaid} onChange={(e) => handleFilterChange(e, 'paid')} />}
                label="Payantes"
              />
              <Chip 
                label={`${filteredCourses.length} formation${filteredCourses.length > 1 ? 's' : ''}`}
                sx={{ ml: 2, color: "#108643" }}
              />
              <FormControl sx={{ ml: 2, minWidth: 120 }}>
                <InputLabel id="sort-select-label">Trier par</InputLabel>
                <Select
                  labelId="sort-select-label"
                  value={sortBy}
                  onChange={handleSortChange}
                  label="Trier par"
                >
                  <MenuItem value="date">Date</MenuItem>
                  <MenuItem value="popularity">Popularité</MenuItem>
                  <MenuItem value="rating">Note</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TrainingList courses={paginatedCourses} onFavoriteToggle={handleFavoriteToggle} />

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
              <Pagination 
                count={Math.ceil(filteredCourses.length / itemsPerPage)} 
                page={page} 
                onChange={handlePageChange}
                color="primary"
                sx={{ mb: 2 }}
              />
              <FormControl sx={{ ml: 2, minWidth: 120 }}>
                <InputLabel id="items-per-page-label">Par page</InputLabel>
                <Select
                  labelId="items-per-page-label"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  label="Par page"
                >
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={27}>27</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </>
        )}
      </Container>
      <Snackbar
        open={filteredCourses.length === 0 && !isLoading}
        message="Aucune formation ne correspond à vos critères de recherche."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Training;