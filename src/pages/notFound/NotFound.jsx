import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1"  sx={{color: '#264653'}} gutterBottom>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page non trouvée
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{bgcolor: '#108643', '&:hover':{bgcolor: '#264653'}}}
          startIcon={<HomeIcon />}
          size="large"
        >
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;