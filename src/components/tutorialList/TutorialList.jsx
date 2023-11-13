import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import TutorialItem from '../tutorialItem/TutorialItem';
import SearchBar from '../searchBar/SearchBar';

import './TutorialList.css';
import TutorialFilter from '../tutorialFilter/TutorialFilter';


const TutorialList = () => {

  let [tutorials, setTutorials] = useState([]);

  // Exemple de données de tutoriels

  // const data = useMemo(() => [
  //   {
  //     id: 1,
  //     title: 'Introduction à React',
  //     category: 'Front-end',
  //     level: 'Débutant',
  //     duration: '1 heure',
  //     imageUrl: 'https://cdn.mindmajix.com/blog/images/introduction-to-reactjs-071119.png',
  //   },
  //   {
  //     id: 2,
  //     title: 'API REST avec Node.js',
  //     category: 'Back-end',
  //     level: 'Intermédiaire',
  //     duration: '2 heures',
  //     imageUrl: 'https://welovedevs.com/wp-content/uploads/2022/08/node-js-api.png',
  //   },
  //   {
  //     id: 3,
  //     title: 'Apprendre PHP & MySQL',
  //     category: 'Back-end',
  //     level: 'Débutant',
  //     duration: '4 heures',
  //     imageUrl: 'https://www.cours-exercices-pdf.com/images/php-mysql.jpg',
  //   },
  //   {
  //     id: 4,
  //     title: 'Les évènements en Laravel',
  //     category: 'Back-end',
  //     level: 'Expert',
  //     duration: '1 heures',
  //     imageUrl: 'https://grafikart.fr/uploads/attachments/2023/laravel-event-642aac19e016d620891814.jpg',
  //   },
  //   {
  //     id: 5,
  //     title: 'Créer une application android avec Java',
  //     category: 'Back-end',
  //     level: 'Intermédiaire',
  //     duration: '2 heures',
  //     imageUrl: 'https://img-b.udemycdn.com/course/750x422/4150774_db89_5.jpg',
  //   },
  //   {
  //     id: 6,
  //     title: 'Flutter Revolution',
  //     category: 'Full-Stack',
  //     level: 'Intermédiaire',
  //     duration: '2 heures',
  //     imageUrl: 'https://formation.drissas.com/hosted/images/72/6fc8888c0640ce99c7a53a17cdd0cf/flutter-revolution-pack-9.png',
  //   },
  //   {
  //     id: 7,
  //     title: 'Application Révolutive avec Angular',
  //     category: 'Front-end',
  //     level: 'Expert',
  //     duration: '4 heures',
  //     imageUrl: 'https://www.moveoapps.com/blog/wp-content/uploads/2021/05/popular-apps-built-with-angular.png',
  //   },
  //   {
  //     id: 8,
  //     title: 'Apprendre à créer un logiciel avec Java Swing',
  //     category: 'Full-stack',
  //     level: 'Intermédiaire',
  //     duration: '3 heures',
  //     imageUrl: 'https://www.testingdocs.com/wp-content/uploads/Java-Swing-API.png',
  //   },
  //   {
  //     id: 9,
  //     title: 'Découvre le FullStack avec Python',
  //     category: 'Full-stack',
  //     level: 'Intermédiaire',
  //     duration: '11 heures',
  //     imageUrl: 'https://www.interviewbit.com/blog/wp-content/uploads/2021/12/Applications-of-Python.png',
  //   },
  //   {
  //     id: 10,
  //     title: 'Apprendre PHP & MySQL',
  //     category: 'Back-end',
  //     level: 'Débutant',
  //     duration: '4 heures',
  //     imageUrl: 'https://www.cours-exercices-pdf.com/images/php-mysql.jpg',
  //   },
  // ], [])

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/tutorials")
      .then((res) => res.json())
      .then(data => {
        setTutorials([...data]);
        console.log(tutorials);
      }).catch(error => {
        console.log(error);
      })
  },[tutorials])

  const levels = ['Débutant', 'Intermédiaire', 'Avancé'];
  const technologies = ['React', 'Vue', 'Angular', 'Node.js', 'Python'];

  const handleFilter = (level, technology) => {
    // Effectuer une action de filtrage en fonction du niveau et de la technologie sélectionnés
    console.log('Niveau sélectionné:', level);
    console.log('Technologie sélectionnée:', technology);
    // ...
  };


  const handleSearch = (searchTerm) => {
    // Effectuer une action de recherche avec le terme saisi
    console.log('Recherche:', searchTerm);
    if (searchTerm) {
      let tuto = tutorials.filter(tutorial => tutorial.title.includes(searchTerm) || tutorial.category.includes(searchTerm));
      setTutorials([...tuto]);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: '70px' }} className="tutorialList mainBg">
      <Box className="banniere" display={'flex'}
        alignItems={'start'} justifyContent={'flex-start'} flexWrap={'wrap'}
        p={10} mb={5} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TutorialFilter levels={levels} technologies={technologies} onFilter={handleFilter} />
        <Box mb={5} ml={{ md: 'auto' }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
      </Box>
      <Grid container spacing={2} px={{ xs: 4 }} justifyContent={'end'} >
        <Stack ml={2} mr={'auto'} width={{ xs: "100%", sm: "100%", md: "60%", lg: "45%" }} >
          <Typography variant="h4" gutterBottom>
            Liste des Tutoriels
          </Typography>
          <Box pr={{ md: 10 }} pb={5} className="p">
            Envie d'apprendre de nouvelles choses et maitriser de nouvelles technologies ?
            Une explication pédagogique avec une vitesse de votre compréhension et une méthode
            appréciée par une comunauté très habile. Alors vous et nous avons de chemin à faire ensemble...
          </Box>
        </Stack>
        {tutorials.length > 0 ? (tutorials.map((tutorial) => (
          <TutorialItem tutorial={tutorial} key={tutorial.id} />
        ))) : <Box className="p">Aucun tutoriel pour le moment...</Box>}
      </Grid>
    </Box>
  );
};


export default TutorialList;




