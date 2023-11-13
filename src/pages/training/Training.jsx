import React, { useState } from 'react';
import {
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  Checkbox,
  FormControlLabel,
  Box,
  Container
} from '@mui/material';
import TrainingBanner from '../../components/trainingBanner/TrainingBanner';
import SubCategoryButtons from '../../components/subCategoryButtons/SubCategoryButtons';
import TrainingList from '../../components/traningList/TrainingList';

import reactImg from "../../assets/images/trainings/react.jpg"
import reactNativeImg from "../../assets/images/trainings/react-native.jpeg";
import flutterImg from "../../assets/images/trainings/flutter.png";
import flutterAdvancedImg from "../../assets/images/trainings/flutter_advanced.jpeg";
import pythonImg from "../../assets/images/trainings/python.jpeg";
import phpImg from "../../assets/images/trainings/php.jpeg";
import androidImg from "../../assets/images/trainings/android.jpeg";
import nodeImg from "../../assets/images/trainings/nodeJs.jpeg";

const coursesData = [
  {
    id: 1,
    title: 'Formation React',
    category: 'React',
    price: 'Gratuit',
    rating: 4.5,
    duration: '8 heures',
    isFavorite: false,
    image: reactImg,
  },
  {
    id: 2,
    title: 'Dévenir expert en Flutter',
    category: 'Flutter',
    price: 'Payant',
    rating: 5.0,
    duration: '16 heures',
    isFavorite: true,
    image: flutterAdvancedImg,
  },
  {
    id: 3,
    title: 'Formation Python',
    category: 'Sécurité Informatique',
    price: 'Gratuit',
    rating: 4.9,
    duration: '17 heures',
    isFavorite: true,
    image: pythonImg,
  },
  {
    id: 4,
    title: 'Formation PHP',
    category: 'Développement backend',
    price: 'Payant',
    rating: 4.5,
    duration: '22 heures',
    isFavorite: false,
    image: phpImg,
  },
  {
    id: 5,
    title: 'Formation React-Native',
    category: 'Développement mobile',
    price: 'Payant',
    rating: 3.6,
    duration: '14 heures',
    isFavorite: false,
    image: reactNativeImg,
  },
  {
    id: 6,
    title: 'Formation Flutter',
    category: 'Flutter',
    price: 'Gratuit',
    rating: 4.8,
    duration: '8 heures',
    isFavorite: true,
    image: flutterImg,
  },
  {
    id: 7,
    title: 'Faire du mobile avec android',
    category: 'Java',
    price: 'Payant',
    rating: 4.8,
    duration: '22 heures',
    isFavorite: true,
    image: androidImg,
  },
  {
    id: 8,
    title: 'Dévenir fullStack avec Node.js, Express.js et MongoDB',
    category: 'Développement fullstack',
    price: 'Payant',
    rating: 3.2,
    duration: '36 heures',
    isFavorite: true,
    image: nodeImg,
  },
  // Ajoutez d'autres données factices pour les formations
];


const Training = () => {
  // const [category, setCategory] = useState('Toutes');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Toutes');
  const [filterFree, setFilterFree] = useState(false);
  const [filterPaid, setFilterPaid] = useState(false);

  // const handleCategoryChange = (event) => {
  //   setCategory(event.target.value);
  // };

  const handleFilterFreeChange = (event) => {
    setFilterFree(event.target.checked);
  };

  const handleFilterPaidChange = (event) => {
    setFilterPaid(event.target.checked);
  };

  const handleFavoriteToggle = (id) => {
    // Mettre à jour l'état du favori pour la formation avec l'ID donné
    // Cela dépend de votre implémentation de gestion des données
  };

  const subCategories = [
    'Toutes',
    'React',
    'Java',
    'Vue.js',
    'Express.js',
    'Développement fullstack',
    'Développement backend',
    'Développement frontend',
    'Flutter',
    'Android',
    // Ajoutez d'autres sous-catégories ici
  ];

const handleSubCategorySelect = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  // const filteredCourses = coursesData.filter((course) => {
  //   if (category === 'Toutes' || course.category === category) {
  //     if (filterFree && course.price === 'Gratuit') {
  //       return true;
  //     }
  //     if (filterPaid && course.price === 'Payant') {
  //       return true;
  //     }
  //     return !filterFree && !filterPaid;
  //   }
  //   return false;
  // });
  const filteredCourses = coursesData.filter((course) => {
    if (selectedSubCategory === 'Toutes' || course.category === selectedSubCategory) {
      if (filterFree && course.price === 'Gratuit') {
              return true;
      }
      if (filterPaid && course.price === 'Payant') {
        return true;
      }
      return !filterFree && !filterPaid;
    }
    return false;
  });

  return (
    <Box className="mainBg">
      <TrainingBanner />
      <Container>
        <SubCategoryButtons
          subCategories={subCategories}
          onSubCategorySelect={handleSubCategorySelect}
        />
        <Box my={2} ml={2} >
            <FormControlLabel
            control={<Checkbox checked={filterFree} onChange={handleFilterFreeChange} />}
            label="Gratuits"
          />
          <FormControlLabel
            control={<Checkbox checked={filterPaid} onChange={handleFilterPaidChange} />}
            label="Payants"
          />
        </Box>
        <TrainingList courses={filteredCourses} onFavoriteToggle={handleFavoriteToggle} />
      </Container>
    </Box>

    // <Box p={4}>
    //   <FormControl fullWidth>
    //     <InputLabel>Catégorie</InputLabel>
    //     <Select value={category} onChange={handleCategoryChange}>
    //       <MenuItem value="Toutes">Toutes</MenuItem>
    //       <MenuItem value="Développement web">Développement web</MenuItem>
    //       <MenuItem value="Développement mobile">Développement mobile</MenuItem>
    //       {/* Ajoutez d'autres catégories */}
    //     </Select>
    //   </FormControl>
    //   <FormControlLabel
    //     control={<Checkbox checked={filterFree} onChange={handleFilterFreeChange} />}
    //     label="Gratuits"
    //   />
    //   <FormControlLabel
    //     control={<Checkbox checked={filterPaid} onChange={handleFilterPaidChange} />}
    //     label="Payants"
    //   />
    //   <TrainingList courses={filteredCourses} onFavoriteToggle={handleFavoriteToggle} />
    // </Box>
  );
};


export default Training;
