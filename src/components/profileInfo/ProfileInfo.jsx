import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const ProfileInfo = ({ auth }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: auth?.firstname,
    lastname: auth?.lastname,
    email: auth?.email,
    address: auth?.address || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update user information
    console.log('Updated user info:', formData);
    setEditMode(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Informations personnelles
        </Typography>
        <Button
          variant="outlined"
          color={editMode ? 'secondary' : 'success'}
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Annuler' : 'Modifier'}
        </Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prénom"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Adresse"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!editMode}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
        {editMode && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" sx={{bgcolor: '#108643', '&:hover': {bgcolor: "#264653"}}}>
              Enregistrer les modifications
            </Button>
          </Box>
        )}
      </form>
    </Paper>
  );
};

export default ProfileInfo;