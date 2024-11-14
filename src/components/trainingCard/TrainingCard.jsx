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
import { Link } from 'react-router-dom';

const TrainingCard = ({ course, onFavoriteToggle }) => {
  return (
    <Card>
        <Link to={`/formations/show/${course.id}`}>
        <CardMedia
        component="img"
        height="200"
        image={`${process.env.REACT_APP_API_URL}/${course.banner}`} // Ajoutez le chemin de l'image de chaque formation ici
        alt={course.title}
      />
      <CardHeader
        action={
          <IconButton onClick={() => onFavoriteToggle(course.id)}>
            {course.favorites ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
        }
        title={course.title}
        subheader={course.type+': '+course.price+'€'}
      />
      <CardContent>
        <Typography variant="body2">Catégorie: {course.categorie.name}</Typography>
        <Typography variant="body2">Durée: {course.totalDuration}</Typography>
        <Rating value={Number(course.ratings)} precision={0.5} readOnly />
      </CardContent>
      {/* <CardActions>
        <Button size="small" variant="contained" 
        // color="success"
        className='btnDetail'
        >
          Détails
        </Button>
      </CardActions> */}
        </Link>
    </Card>
  );
};

export default TrainingCard;
