import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


function TutorialItem({tutorial}) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={tutorial.id} >
        <Link to={`/tutoriels/show/${tutorial.id}`}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={process.env.REACT_APP_API_URL +'/'+ tutorial.images[0].src}
                alt={tutorial.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {tutorial.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {/* Catégorie : */}
                  {tutorial.technologies.map(technologie => <span>{technologie.title}, </span>)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Niveau : {tutorial.level.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Durée : {tutorial.duration}
                </Typography>
              </CardContent>
            </Card>
        </Link>
    </Grid>
  )
}

export default TutorialItem