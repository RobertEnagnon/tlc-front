// import React from 'react'
// import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';


// function TutorialItem({tutorial}) {
//   return (
//     <Grid item xs={12} sm={6} md={4} lg={3} key={tutorial.id} >
//         <Link to={`/tutoriels/show/${tutorial.id}`}>
//             <Card>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image={process.env.REACT_APP_API_URL +'/'+ tutorial.images[0].src}
//                 alt={tutorial.title}
//               />
//               <CardContent>
//                 <Typography variant="h6" component="div">
//                   {tutorial.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {/* Catégorie : */}
//                   {tutorial.technologies.map(technologie => <span>{technologie.title}, </span>)}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Niveau : {tutorial.level.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Durée : {tutorial.duration}
//                 </Typography>
//               </CardContent>
//             </Card>
//         </Link>
//     </Grid>
//   )
// }

// export default TutorialItem


import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button,
  Box,
  Chip
} from '@mui/material';
import { AccessTime, Category } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const TutorialItem = ({ tutorial }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: "#f5f5f5",
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 3,
      }
    }}>
      <CardMedia
        component="img"
        height="140"
        // image={tutorial.imageUrl || "/placeholder.svg"}
        image={process.env.REACT_APP_API_URL +'/'+ tutorial?.images[0].src}
        alt={tutorial.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
          {tutorial?.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime sx={{ fontSize: 'small', mr: 0.5, color: '#11998e' }} />
          <Typography variant="body2" color="text.secondary">
            {tutorial?.duration || 'Durée non spécifiée'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Category sx={{ fontSize: 'small', mr: 0.5, color: '#11998e' }} />
          <Typography variant="body2" color="text.secondary">
            {tutorial?.category || 'Catégorie non spécifiée'}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={tutorial?.level?.title || 'Niveau non spécifié'} 
            size="small" 
            sx={{ 
              bgcolor: '#11998e', 
              color: 'white',
              fontWeight: 'bold'
            }} 
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {tutorial?.description}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button 
          component={Link} 
          // to={`/tutoriels/${tutorial?.id}`}
          to={`/tutoriels/show/${tutorial?.id}`}
          variant="contained" 
          fullWidth
          sx={{
            bgcolor: '#264653',
            '&:hover': {
              bgcolor: '#11998e',
            }
          }}
        >
          Voir le tutoriel
        </Button>
      </Box>
    </Card>
  );
};

export default TutorialItem;