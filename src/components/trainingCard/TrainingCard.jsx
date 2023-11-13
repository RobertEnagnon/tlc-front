import React from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  CardActions,
  Button,
  Rating,
  CardMedia,
} from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';

const TrainingCard = ({ course, onFavoriteToggle }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={course.image} // Ajoutez le chemin de l'image de chaque formation ici
        alt={course.title}
      />
      <CardHeader
        action={
          <IconButton onClick={() => onFavoriteToggle(course.id)}>
            {course.isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        }
        title={course.title}
        subheader={course.price}
      />
      <CardContent>
        <Typography variant="body2">Catégorie: {course.category}</Typography>
        <Typography variant="body2">Durée: {course.duration}</Typography>
        <Rating value={course.rating} precision={0.5} readOnly />
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" 
        // color="success"
        className='btnDetail'
        >
          Détails
        </Button>
      </CardActions>
    </Card>
  );
};

export default TrainingCard;
