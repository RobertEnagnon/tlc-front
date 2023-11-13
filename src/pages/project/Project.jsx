
import React, { useState } from 'react';
import { Box, Typography, Button, FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import ReactProject  from "../../assets/images/projet1.jpeg";
import LaravelProject from '../../assets/images/projet2.jpeg';
import ExpressJsProject from '../../assets/images/projet3.jpeg';
import AndroidProject from '../../assets/images/projet4.jpeg';
import FlutterProject from '../../assets/images/projet5.jpeg';
import PythonProject from '../../assets/images/projet6.jpeg';
import './Project.css'

const projectsData = [
  {
    id: 1,
    title: 'Projet React',
    category: 'React',
    type: 'Gratuit',
    imageUrl: ReactProject,
    downloadLink: 'https://example.com/react-project-download',
  },
  {
    id: 2,
    title: 'Projet Laravel',
    category: 'Laravel',
    type: 'Payant',
    imageUrl: LaravelProject,
    downloadLink: 'https://example.com/laravel-project-download',
  },
  {
    id: 3,
    title: 'Projet Flutter',
    category: 'Flutter',
    type: 'Gratuit',
    imageUrl: FlutterProject,
    downloadLink: 'https://example.com/react-project-download',
  },
  {
    id: 4,
    title: 'Projet Python',
    category: 'Python',
    type: 'Gratuit',
    imageUrl: PythonProject,
    downloadLink: 'https://example.com/react-project-download',
  },
  {
    id: 5,
    title: 'Projet Express.js',
    category: 'Express.js',
    type: 'Gratuit',
    imageUrl: ExpressJsProject,
    downloadLink: 'https://example.com/react-project-download',
  },
  {
    id: 6,
    title: 'Projet Android',
    category: 'Android',
    type: 'Gratuit',
    imageUrl: AndroidProject,
    downloadLink: 'https://example.com/react-project-download',
  },
];

const categories = ['Toutes', 'React', 'Laravel', 'Python', 'Java', 'Fullstack', 'Frontend', 'Backend', 'PHP', 'Android', 'Flutter', 'React Native', 'Express.js', 'Node.js'];

const Project = () => {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedType, setSelectedType] = useState('Tous');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === 'Toutes' || project.category === selectedCategory) {
      if (selectedType === 'Tous' || project.type === selectedType) {
        return true;
      }
    }
    return false;
  });

  return (
    <Box className="mainBg">
      {/* Bannière */}
      <Box
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          py: 10,
        }}
        className="banniere"
      >
        <Typography variant="h3" gutterBottom>
          Projets
        </Typography>
        <Typography variant='body1' className='info' gutterBottom>
          Découvrez nos projets passionnants et enrichissants dans différentes domaines.
        </Typography>
      </Box>

      {/* Filtres */}
      <Box mt={4} display="flex" justifyContent="center">
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel sx={{fontSize:'20px'}}>Catégorie</InputLabel> <br />
          <Select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel sx={{fontSize:'20px'}}>Type</InputLabel> <br />
          <Select value={selectedType} onChange={handleTypeChange}>
            <MenuItem value="Tous">Tous</MenuItem>
            <MenuItem value="Gratuit">Gratuit</MenuItem>
            <MenuItem value="Payant">Payant</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Projets */}
      <Box mt={4} px={{lg:30,md:10,sm:5,xs:5}}>
        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <Box bgcolor={'#fff'} sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 4, boxShadow: '0 0 1px black '}}>
                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                <Typography variant="h6" gutterBottom mt={2}>
                  {project.title}
                </Typography>
                <Typography variant="body1" gutterBottom color={'#2C5364'}>
                  {project.type}
                </Typography>
                <Button variant="contained" color="success" href={project.downloadLink} target="_blank" rel="noopener">
                  Télécharger
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};


export default Project;
