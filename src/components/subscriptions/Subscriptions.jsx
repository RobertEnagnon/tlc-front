import React from 'react';
import { Paper, Typography, Box, Button, Chip } from '@mui/material';

const Subscriptions = ({ auth }) => {
  const subscriptionStatus = auth?.isPremium ? 'Premium' : 'Standard';
  const expiryDate = auth?.isPremium ? new Date('2023-12-31').toLocaleDateString() : 'N/A';

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Abonnements
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">
          Statut actuel: <Chip label={subscriptionStatus} color={auth?.isPremium ? 'primary' : 'default'} />
        </Typography>
        {auth?.isPremium && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Votre abonnement Premium expire le: {expiryDate}
          </Typography>
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained"  sx={{bgcolor: "#108643", '&:hover':{bgcolor:'#264653'}}}>
          {auth?.isPremium ? 'Gérer mon abonnement' : 'Passer à l\'abonnement Premium'}
        </Button>
      </Box>
    </Paper>
  );
};

export default Subscriptions;