
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import BannerImage from '../../assets/images/bannerTra.jpeg';

const TrainingBanner = () => {
  return (
    <Box
      sx={{
        // backgroundImage: `linear-gradient(rgba(15, 32, 39, 0.7), rgba(15, 32, 39, 0.7)), url(${BannerImage})`,
        // background: 'linear-gradient(to left, #11998e, #38ef7d,#11998e)',
        background: 'linear-gradient(to left, #38ef7d, #11998e)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          color="#fff" 
          align="center" 
          fontStyle={'italic'}
          sx={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontWeight: 'bold',
            mb: 2
          }}
        >
          Découvrez nos formations
        </Typography>
        <Typography 
          variant="h5" 
          color="#fff" 
          align="center"
          sx={{
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          Développez vos compétences avec nos cours en ligne de haute qualité
        </Typography>
      </Container>
    </Box>
  );
};

export default TrainingBanner;