import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const reasons = [
  {
    title: 'Contenu Exclusif',
    description: 'Accédez à des tutoriels avancés, des projets complets et des ressources exclusives.',
  },
  {
    title: 'Soutien à la Création',
    description: 'Contribuez à la production continue de contenu éducatif de haute qualité.',
  },
  {
    title: 'Communauté Active',
    description: 'Rejoignez une communauté dynamique de développeurs passionnés sur Telegram et Discord.',
  },
  {
    title: 'Interaction Directe',
    description: 'Discutez directement avec nos formateurs experts et obtenez des réponses à vos questions.',
  },
];

const WhyPremium = () => {
  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        Pourquoi devenir Premium ?
      </Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {reasons.map((reason, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StyledPaper elevation={2} sx={{ minHeight: 200}} >
                <Typography variant="h6" gutterBottom>
                  {reason.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {reason.description}
                </Typography>
              </StyledPaper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhyPremium;