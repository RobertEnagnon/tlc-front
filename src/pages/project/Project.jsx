


// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Button, 
//   FormControl, 
//   InputLabel, 
//   MenuItem, 
//   Select, 
//   Grid, 
//   Container, 
//   Card, 
//   CardMedia, 
//   CardContent, 
//   CardActions,
//   Chip,
//   useMediaQuery
// } from '@mui/material';
// import { styled, useTheme } from '@mui/material/styles';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Download, Search } from '@mui/icons-material';

// // Import your images here
// import ReactProject from "../../assets/images/projet1.jpeg";
// import LaravelProject from '../../assets/images/projet2.jpeg';
// import ExpressJsProject from '../../assets/images/projet3.jpeg';
// import AndroidProject from '../../assets/images/projet4.jpeg';
// import FlutterProject from '../../assets/images/projet5.jpeg';
// import PythonProject from '../../assets/images/projet6.jpeg';

// const projectsData = [
//   {
//     id: 1,
//     title: 'Projet React',
//     category: 'React',
//     type: 'Gratuit',
//     imageUrl: ReactProject,
//     downloadLink: 'https://example.com/react-project-download',
//     description: 'Un projet React moderne avec des fonctionnalités avancées.',
//   },
//   {
//     id: 2,
//     title: 'Projet Laravel',
//     category: 'Laravel',
//     type: 'Payant',
//     imageUrl: LaravelProject,
//     downloadLink: 'https://example.com/laravel-project-download',
//     description: 'Une application web robuste construite avec Laravel.',
//   },
//   {
//     id: 3,
//     title: 'Projet Flutter',
//     category: 'Flutter',
//     type: 'Gratuit',
//     imageUrl: FlutterProject,
//     downloadLink: 'https://example.com/flutter-project-download',
//     description: 'Une application mobile cross-platform développée avec Flutter.',
//   },
//   {
//     id: 4,
//     title: 'Projet Python',
//     category: 'Python',
//     type: 'Gratuit',
//     imageUrl: PythonProject,
//     downloadLink: 'https://example.com/python-project-download',
//     description: 'Un script Python puissant pour l\'analyse de données.',
//   },
//   {
//     id: 5,
//     title: 'Projet Express.js',
//     category: 'Express.js',
//     type: 'Gratuit',
//     imageUrl: ExpressJsProject,
//     downloadLink: 'https://example.com/expressjs-project-download',
//     description: 'Une API RESTful construite avec Express.js et Node.js.',
//   },
//   {
//     id: 6,
//     title: 'Projet Android',
//     category: 'Android',
//     type: 'Gratuit',
//     imageUrl: AndroidProject,
//     downloadLink: 'https://example.com/android-project-download',
//     description: 'Une application Android native avec des fonctionnalités modernes.',
//   },
// ];

// const categories = ['Toutes', 'React', 'Laravel', 'Python', 'Java', 'Fullstack', 'Frontend', 'Backend', 'PHP', 'Android', 'Flutter', 'React Native', 'Express.js', 'Node.js'];

// const StyledCard = styled(Card)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   height: '100%',
//   transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'translateY(-5px)',
//     boxShadow: theme.shadows[4],
//   },
// }));

// const StyledCardMedia = styled(CardMedia)({
//   paddingTop: '56.25%', // 16:9 aspect ratio
// });

// const StyledFormControl = styled(FormControl)(({ theme }) => ({
//   margin: theme.spacing(1),
//   minWidth: 150,
//   [theme.breakpoints.down('sm')]: {
//     minWidth: '100%',
//   },
// }));

// const Project = () => {
//   const [selectedCategory, setSelectedCategory] = useState('Toutes');
//   const [selectedType, setSelectedType] = useState('Tous');
//   const [searchTerm, setSearchTerm] = useState('');
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleTypeChange = (event) => {
//     setSelectedType(event.target.value);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredProjects = projectsData.filter((project) => {
//     const categoryMatch = selectedCategory === 'Toutes' || project.category === selectedCategory;
//     const typeMatch = selectedType === 'Tous' || project.type === selectedType;
//     const searchMatch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
//     return categoryMatch && typeMatch && searchMatch;
//   });

//   return (
//     <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
//       <Box
//         sx={{
//           backgroundImage: 'linear-gradient(to right, #11998e, #38ef7d)',
//           color: 'white',
//           textAlign: 'center',
//           py: { xs: 6, md: 10 },
//           px: 2,
//         }}
//       >
//         <Container maxWidth="lg">
//           <Typography variant="h3" component="h1" gutterBottom>
//             Projets
//           </Typography>
//           <Typography variant='h5' sx={{ fontStyle: 'italic', maxWidth: '800px', margin: '0 auto' }}>
//             Découvrez nos projets passionnants et enrichissants dans différents domaines.
//           </Typography>
//         </Container>
//       </Box>

//       <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
//         <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 4 }}>
//           <StyledFormControl>
//             <InputLabel>Catégorie</InputLabel>
//             <Select value={selectedCategory} onChange={handleCategoryChange} label="Catégorie">
//               {categories.map((category) => (
//                 <MenuItem key={category} value={category}>
//                   {category}
//                 </MenuItem>
//               ))}
//             </Select>
//           </StyledFormControl>

//           <StyledFormControl>
//             <InputLabel>Type</InputLabel>
//             <Select value={selectedType} onChange={handleTypeChange} label="Type">
//               <MenuItem value="Tous">Tous</MenuItem>
//               <MenuItem value="Gratuit">Gratuit</MenuItem>
//               <MenuItem value="Payant">Payant</MenuItem>
//             </Select>
//           </StyledFormControl>

//           <StyledFormControl>
//             <InputLabel>Recherche</InputLabel>
//             <Select
//               value=""
//               onChange={handleSearchChange}
//               displayEmpty
//               label="Recherche"
//               IconComponent={Search}
//               renderValue={(selected) => {
//                 if (selected.length === 0) {
//                   return <em>Rechercher un projet</em>;
//                 }
//                 return selected;
//               }}
//             >
//               <MenuItem disabled value="">
//                 <em>Rechercher un projet</em>
//               </MenuItem>
//             </Select>
//           </StyledFormControl>
//         </Box>

//         <AnimatePresence>
//           <Grid container spacing={3}>
//             {filteredProjects.map((project) => (
//               <Grid item key={project.id} xs={12} sm={6} md={4}>
//                 <motion.div
//                   layout
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <StyledCard>
//                     <StyledCardMedia
//                       image={project.imageUrl}
//                       title={project.title}
//                     />
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Typography gutterBottom variant="h5" component="div">
//                         {project.title}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" paragraph>
//                         {project.description}
//                       </Typography>
//                       <Chip 
//                         label={project.type} 
//                         color={project.type === 'Gratuit' ? 'success' : 'primary'} 
//                         size="small" 
//                       />
//                     </CardContent>
//                     <CardActions>
//                       <Button 
//                         variant="contained" 
//                         startIcon={<Download />}
//                         href={project.downloadLink} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         fullWidth
//                         sx={{
//                           bgcolor: '#11998e',
//                           '&:hover': {
//                             bgcolor: '#0e8c7f',
//                           },
//                         }}
//                       >
//                         Télécharger
//                       </Button>
//                     </CardActions>
//                   </StyledCard>
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </AnimatePresence>
//       </Container>
//     </Box>
//   );
// };

// export default Project;



import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Chip, 
  TextField, 
  InputAdornment,
  Pagination,
  Rating,
  Skeleton,
  useMediaQuery
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence, color } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import your project data here
import { projectsData } from '../../utils/data/projectsData';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setProjects(projectsData);
      setFilteredProjects(projectsData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const results = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
    setCurrentPage(1);
  }, [searchTerm, projects]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (event, value) => setCurrentPage(value);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          Nos Projets
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 500 }}
          />
        </Box>

        <AnimatePresence>
          <Grid container spacing={4}>
            {loading
              ? Array.from(new Array(6)).map((_, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Skeleton variant="rectangular" width="100%" height={200} />
                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                  </Grid>
                ))
              : currentProjects.map((project) => (
                  <Grid item key={project.id} xs={12} sm={6} md={4}>
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Card 
                        sx={{ 
                          height: '100%', 
                          display: 'flex', 
                          flexDirection: 'column',
                          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: 6,
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={project.imageUrl}
                          alt={project.title}
                        /> 
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {project.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {project.description.substring(0, 100)}...
                          </Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                            <Chip label={project.category} sx={{bgcolor:'#11998e', color:'#fff'}} size="small" />
                            <Chip label={project.type} color={project.type === 'Gratuit' ? 'info' : 'secondary'} size="small" />
                          </Box>
                          <Rating name="read-only" value={project.rating} readOnly sx={{ mt: 2 }} />
                        </CardContent>
                        <CardActions>
                          <Button 
                            component={Link} 
                            to={`/projets/${project.id}`} 
                            variant="contained" 
                            fullWidth
                            sx={{
                              // bgcolor: theme.palette.success.main,
                              bgcolor: '#11998e',
                              '&:hover': {
                                bgcolor: theme.palette.success.main,
                              },
                            }}
                          >
                            Voir les détails
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
          </Grid>
        </AnimatePresence>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Pagination 
            count={Math.ceil(filteredProjects.length / projectsPerPage)} 
            page={currentPage} 
            onChange={paginate} 
            // color="primary" 
            sx={{color: "#11998e"}}
            size={isMobile ? 'small' : 'large'}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Project;