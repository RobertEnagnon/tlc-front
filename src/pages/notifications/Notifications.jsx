import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  IconButton, 
  Divider,
  Badge,
  Chip
} from '@mui/material';
import { 
  Notifications as NotificationsIcon, 
  Close as CloseIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  ErrorOutline as ErrorOutlineIcon,
  InfoOutlined as InfoOutlinedIcon
} from '@mui/icons-material';

// Composant principal de la page de notifications
const Notifications = () => {
  // État pour stocker les notifications
  const [notifications, setNotifications] = useState([]);

  // Effet pour charger les notifications (simulation d'un appel API)
  useEffect(() => {
    // Fonction pour charger les notifications
    const loadNotifications = () => {
      // Simulation de données de notification
      const mockNotifications = [
        { id: 1, type: 'info', message: "Nouvelle formation disponible : React Avancé", date: "2023-05-15", read: false },
        { id: 2, type: 'success', message: "Félicitations ! Vous avez terminé le cours de JavaScript", date: "2023-05-14", read: true },
        { id: 3, type: 'error', message: "Erreur lors du téléchargement du projet", date: "2023-05-13", read: false },
        { id: 4, type: 'info', message: "Rappel : Session de mentorat demain à 14h", date: "2023-05-12", read: false },
        { id: 5, type: 'success', message: "Votre projet a été approuvé par un mentor", date: "2023-05-11", read: true },
      ];
      setNotifications(mockNotifications);
    };

    loadNotifications();
  }, []);

  // Fonction pour marquer une notification comme lue
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Fonction pour supprimer une notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Fonction pour obtenir l'icône correspondant au type de notification
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlineIcon sx={{ color: '#108643' }} />;
      case 'error':
        return <ErrorOutlineIcon sx={{ color: '#264653' }} />;
      default:
        return <InfoOutlinedIcon sx={{ color: '#2C5364' }} />;
    }
  };

  // Calcul du nombre de notifications non lues
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <Box sx={{ maxWidth: 600,minHeight:'37.5vh', margin: 'auto', mt: 8, p: 3 }}>
      {/* Titre de la page avec le nombre de notifications non lues */}
      <Typography variant="h4" gutterBottom sx={{ color: '#0F2027', display: 'flex', alignItems: 'center' }}>
        Notifications
        <Badge badgeContent={unreadCount} color="error" sx={{ ml: 2 }}>
          <NotificationsIcon sx={{ color: '#108643' }} />
        </Badge>
      </Typography>

      {/* Liste des notifications */}
      <List>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <ListItem 
              alignItems="flex-start"
              secondaryAction={
                <IconButton edge="end" aria-label="supprimer" onClick={() => removeNotification(notification.id)}>
                  <CloseIcon />
                </IconButton>
              }
              sx={{ 
                bgcolor: notification.read ? 'transparent' : 'rgba(0, 255, 157, 0.1)',
                '&:hover': { bgcolor: 'rgba(0, 255, 157, 0.2)' }
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'transparent' }}>
                  {getNotificationIcon(notification.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    sx={{ display: 'flex', alignItems: 'center', color: '#0F2027' }}
                    component="span"
                    variant="body1"
                  >
                    {notification.message}
                    {!notification.read && (
                      <Chip 
                        label="Nouveau" 
                        size="small" 
                        sx={{ ml: 1, bgcolor: '#108643', color: '#fff' }} 
                        onClick={() => markAsRead(notification.id)}
                      />
                    )}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {new Date(notification.date).toLocaleDateString()}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>

      {/* Message si aucune notification */}
      {notifications.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#203A43', mt: 4 }}>
          Vous n'avez aucune notification pour le moment.
        </Typography>
      )}
    </Box>
  );
};

export default Notifications;