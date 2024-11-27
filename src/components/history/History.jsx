import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material';

const History = ({ auth }) => {
  // Placeholder data, replace with actual data from API
  const historyItems = [
    { id: 1, title: 'Introduction à React', date: '2023-05-15' },
    { id: 2, title: 'Les bases de Node.js', date: '2023-05-10' },
    { id: 3, title: 'CSS avancé', date: '2023-05-05' },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Historique d'apprentissage
      </Typography>
      <List>
        {historyItems.map((item) => (
          <ListItem key={item.id} button>
            <ListItemIcon>
              <PlayCircleOutline />
            </ListItemIcon>
            <ListItemText 
              primary={item.title}
              secondary={`Consulté le ${new Date(item.date).toLocaleDateString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default History;