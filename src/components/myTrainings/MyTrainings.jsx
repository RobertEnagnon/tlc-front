import React from 'react';
import { Paper, Typography, Grid, Card, CardContent, CardMedia, LinearProgress, Box } from '@mui/material';
import ReactProject from "../../assets/images/projet1.jpeg";
import LaravelProject from '../../assets/images/projet2.jpeg';
import ExpressJsProject from '../../assets/images/projet3.jpeg';

const MyTrainings = ({ auth }) => {
  // Placeholder data, replace with actual data from API
  const trainings = [
    { id: 1, title: 'React Avancé', progress: 75, image:ReactProject},
    { id: 2, title: 'Node.js pour Débutants', progress: 30, image: ExpressJsProject},
    { id: 3, title: 'CSS Flexbox et Grid', progress: 100, image: LaravelProject },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Mes Formations
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {trainings.map((training) => (
          <Grid item xs={12} sm={6} md={4} key={training.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={training.image}
                alt={training.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {training.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: '100%', mr: 1}}>
                    <LinearProgress  color='success' variant="determinate" value={training.progress} />
                  </Box>
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2"  sx={{color:'#2C5364'}} >{`${Math.round(training.progress)}%`}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default MyTrainings;