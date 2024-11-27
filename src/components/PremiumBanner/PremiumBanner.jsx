import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import "./PremiumBanner.css"

const PremiumBanner = () => {
  return (
    <Box
    className="banniere"
      sx={{
        // bgcolor: 'linear-gradient(to left, #38ef7d, #11998e)',
        color: 'primary.contrastText',
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Devenir Premium
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px' }}>
            Accédez à une expérience d'apprentissage exclusive, soutenez la création de contenu
            de qualité et rejoignez une communauté passionnée de développeurs.
          </Typography>
        </motion.div>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/path/to/premium-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default PremiumBanner;