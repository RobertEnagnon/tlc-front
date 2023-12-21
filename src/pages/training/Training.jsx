import React, { useEffect, useState } from 'react';
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
import TrainingList from '../../components/traningList/TrainingList';
import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';




const Training = () => {
  // Les booleens qui permettent de savoir si on filtre les formations gratuites ou payantes
  const [filterFree, setFilterFree] = useState(false);
  const [filterPaid, setFilterPaid] = useState(false);
  // Les données de toutes les formations
  const [trainingData,setTrainingDate] = useState(null)
  
  // les données sur les categories
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('Toutes');

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);


  // Récupérartions des données de formations dépuis l'api
  useEffect(()=>{
    setIsLoading(true);
    const fetchData = async()=>{
       // On définit les entêtes
    const headers = {
      "Content-Type": "application/json",
    };
      try {
        // Obtenir toutes les formations
        const trainResp = await fetch(process.env.REACT_APP_API_URL+'/trainings',{
          headers
        });
        const trainData = await trainResp?.json();
        setTrainingDate(trainData)
        // Obtenir toutes les catégories de formations
        const catResp = await fetch(process.env.REACT_APP_API_URL+'/categories',{
          headers
        });
        const catData = await catResp?.json();
        setCategories(catData);

        setIsLoading(false)
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }

    }
   

    fetchData();
  },[]);



  // Charger la catégorie sur laquelle on a cliqué 
const onCategoryNameSelect = (categoryName) => {
    setSelectedCategoryName(categoryName);
  };

  
  /**
   * On filtre les données à afficher en fonction du type de formation(gratuite ou payante)
   * On renvoie un tablo corespondant au filtre de la categorie de formation et du type(gratuit|| payant)
   * de formation
   */
  const filteredCourses = trainingData?.filter((course) => {
    // Si la categorie cliquée est toutes ou autre que toutes
    if (selectedCategoryName === 'Toutes' || course.categorie.name === selectedCategoryName) {
      // Ici on renvoie uniquement les formations gratuites de la catégorie
      if (filterFree && course.type === 'gratuit') {
              return true;
      }
      // Ici on renvoie uniquement les formations payantes de la catégorie
      if (filterPaid && course.type === 'payant') {
        return true;
      }
      // Ici on renvoie les formations gratuites et payantes de la catégorie
      return !filterFree && !filterPaid;
    }
    // Ici on renvoie toutes les formations sans exception
    return false;
  });

   // La case à cocher pour Filtrer pour les formations gratuites
   const handleFilterFreeChange = (event) => {
    setFilterFree(event.target.checked);
  };
 // La case à cocher pour Filtrer pour les formations payantes
  const handleFilterPaidChange = (event) => {
    setFilterPaid(event.target.checked);
  };

  const handleFavoriteToggle = (id) => {
    // Mettre à jour l'état du favori pour la formation avec l'ID donné
    // Cela dépend de votre implémentation de gestion des données
  };

  return (
    <Box className="mainBg">
      <TrainingBanner />
      {isLoading ? <Box my={2} ml={2} sx={{fontSize: 30, textAlign: 'center'}}> CHARGEMENT...</Box> : 
      (<Container>
        <CategoryButtons
          categories={categories}
          onCategoryNameSelect={onCategoryNameSelect}
        />
        <Box my={2} ml={2} >
            <FormControlLabel
            control={<Checkbox checked={filterFree} onChange={handleFilterFreeChange} />}
            label="Gratuites"
          />
          <FormControlLabel
            control={<Checkbox checked={filterPaid} onChange={handleFilterPaidChange} />}
            label="Payantes"
          />
        </Box>
        <TrainingList courses={filteredCourses} onFavoriteToggle={handleFavoriteToggle} />
      </Container>)}
    </Box>
  );
};


export default Training;
