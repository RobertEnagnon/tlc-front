// import React from 'react';
// import {
//   Typography,
//   Card,
//   CardHeader,
//   CardContent,
//   IconButton,
//   CardActions,
//   Button,
//   Rating,
//   CardMedia,
// } from '@mui/material';
// import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
// import { Link } from 'react-router-dom';

// const TrainingCard = ({ course, onFavoriteToggle }) => {
//   return (
//     <Card>
//         <Link to={`/formations/show/${course.id}`}>
//         <CardMedia
//         component="img"
//         height="200"
//         image={`${process.env.REACT_APP_API_URL}/${course.banner}`} // Ajoutez le chemin de l'image de chaque formation ici
//         alt={course.title}
//       />
//       <CardHeader
//         action={
//           <IconButton onClick={() => onFavoriteToggle(course.id)}>
//             {course.favorites ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
//           </IconButton>
//         }
//         title={course.title}
//         subheader={course.type+': '+course.price+'€'}
//       />
//       <CardContent>
//         <Typography variant="body2">Catégorie: {course.categorie.name}</Typography>
//         <Typography variant="body2">Durée: {course.totalDuration}</Typography>
//         <Rating value={Number(course.ratings)} precision={0.5} readOnly />
//       </CardContent>
//       {/* <CardActions>
//         <Button size="small" variant="contained" 
//         // color="success"
//         className='btnDetail'
//         >
//           Détails
//         </Button>
//       </CardActions> */}
//         </Link>
//     </Card>
//   );
// };

// export default TrainingCard;



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
  Box,
  Chip
} from '@mui/material';
import { Favorite, FavoriteBorder, AccessTime, Euro } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const TrainingCard = ({ course, onFavoriteToggle }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 6,
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={`${process.env.REACT_APP_API_URL}/${course.banner}`}
        alt={course.title}
      />
      <CardHeader
        action={
          <IconButton onClick={() => onFavoriteToggle(course.id)}>
            {course.favorites ? <Favorite color="error" /> : <FavoriteBorder />}
          </IconButton>
        }
        title={
          <Typography variant="h6" component="div" noWrap>
            {course.title}
          </Typography>
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Chip 
              label={course.type === 'gratuit' ? 'Gratuit' : 'Payant'} 
              color={course.type === 'gratuit' ? 'success' : 'warning'} 
              size="small" 
              sx={{ mr: 1 }}
            />
            {course.type === 'payant' && (
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                <Euro fontSize="small" sx={{ mr: 0.5 }} />
                {course.price}
              </Typography>
            )}
          </Box>
        }
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Catégorie: {course.categorie.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {course.totalDuration}
          </Typography>
        </Box>
        <Rating value={Number(course.ratings)} precision={0.5} readOnly size="small" />
      </CardContent>
      <CardActions>
        <Button 
          component={Link} 
          to={`/formations/show/${course.id}`}
          size="small" 
          variant="contained" 
          fullWidth
          sx={{
            bgcolor: '#108643',
            '&:hover': {
              bgcolor: '#0F2027',
            }
          }}
        >
          Voir les détails
        </Button>
      </CardActions>
    </Card>
  );
};

export default TrainingCard;