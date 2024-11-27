import React, { useState } from 'react';
import { Paper, Typography, Box, TextField, Button, Switch, FormControlLabel } from '@mui/material';

const AccountSettings = ({ auth }) => {
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  const handleChangePassword = (e) => {
    e.preventDefault();
    // TODO: Implement password change logic
    console.log('Password change requested');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb:5 }}>
      <Typography variant="h5" gutterBottom>
        Paramètres du compte
      </Typography>
      <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Changer le mot de passe
        </Typography>
        <TextField
          fullWidth
          type="password"
          label="Mot de passe actuel"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="password"
          label="Nouveau mot de passe"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="password"
          label="Confirmer le nouveau mot de passe"
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 2,bgcolor: "#108643", '&:hover':{bgcolor:'#264653'} }}>
          Changer le mot de passe
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Préférences de notification
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              color="success"

              sx={{color: '#108643'}}
            />
          }
          label="Recevoir des notifications par email"
        />
        <FormControlLabel
          control={
            <Switch
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              color="success"
            />
          }
          label="S'abonner à la newsletter"
        />
      </Box>
    </Paper>
  );
};

export default AccountSettings;