import React from 'react';
import { Box, Typography } from '@mui/material';
import BannerImage from '../../assets/images/bannerTra.jpeg'; // Importez votre image de bannière ici
//#264653
const TrainingBanner = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${BannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" color="#fff" align="center" fontStyle={'italic'}>
        Découvrez nos formations
      </Typography>
    </Box>
  );
};

export default TrainingBanner;
