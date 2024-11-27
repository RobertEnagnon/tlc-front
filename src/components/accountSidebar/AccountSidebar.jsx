import React from 'react';
import { Box, Avatar, Typography, List, ListItemButton, ListItemIcon, ListItemText, FormLabel, Input } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Person as PersonIcon,
  History as HistoryIcon,
  Subscriptions as SubscriptionsIcon,
  School as SchoolIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAppContext } from '../../context/appContext';
import { toast, ToastContainer } from 'react-toastify';

const AccountSidebar = () => {
  const { auth, setAuth, getCurrentUser, userProfile, setUserProfile, getProfile } = useAppContext();
  const location = useLocation();

  const menuItems = [
    { name: 'Profil', icon: <PersonIcon />, path: 'profile' },
    { name: 'Historique', icon: <HistoryIcon />, path: 'history' },
    { name: 'Abonnements', icon: <SubscriptionsIcon />, path: 'subscriptions' },
    { name: 'Mes Formations', icon: <SchoolIcon />, path: 'trainings' },
    { name: 'Paramètres', icon: <SettingsIcon />, path: 'settings' },
  ];

  const handleAvatarChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (!file) return;
      // setIsLoading(true)
      try {
        const formData = new FormData();
        formData.append('photo', file); 
        // Simulate API call
        // await new Promise(resolve => setTimeout(resolve, 1000))
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile-picture`, {
          method: 'PUT',
          body: formData,
          headers: {
            'Authorization': `Bearer ${auth.token}`,
          },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // In a real app, you would upload the file to a server and get a URL back
        // setUserProfile({...userProfile, photo: URL.createObjectURL(file) })
        const data = await response.json();

        console.log('Photo de profil mise à jour:', data);
        toast(data?.message);
        setUserProfile(data.user);
        // console.log("photo: ",  URL.createObjectURL(file) );
        // console.log("auth", userProfile); 
        // toast.success("Avatar mis à jour avec succès")
        // setIsLoading(false)
      } catch (error) {
        // toast.error("Erreur lors du téléchargement de l'avatar")
        // console.error("Erreur lors de la mise à jour de la photo de profil: ",error)
        toast.error("Erreur lors de la mise à jour de la photo de profil");
        console.error( error);
        // setIsLoading(false)
      }
    }
  }

  return (
    <Box
      component="nav"
      sx={{
        width: { xs: '100%', md: 280 },
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        overflow: 'hidden',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
          userProfile?.photo ?
            <Avatar
              // src={`${process.env.REACT_APP_API_URL}/${userProfile?.photo}`}
              src={`${userProfile?.photo}`}
              sx={{ width: 80, height: 80, mb: 2 }}
            />
            :
            <Box sx={{ width: 80, height: 80, borderRadius: 40, display: 'grid', placeItems: 'center', bgcolor: '#dfdddd', color: '#0F2027' }} >
              <Typography variant='h5' >{auth?.firstname?.charAt(0)}</Typography>
            </Box>
        }
        <FormLabel htmlFor="avatar-upload"
          sx={{ cursor: 'pointer', bgcolor: "#0F2027", color: "#fff", '&:hover': { bgcolor: "#264653", transition: "all .3s" } }}
        // className="cursor-pointer bg-blue-900 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Changer l'avatar
          <Input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} sx={{ display: 'none' }} />
        </FormLabel>
        <Typography variant="h6">{`${auth?.firstname} ${auth?.lastname}`}</Typography>
        <Typography variant="body2" color="text.secondary">
          {auth?.isPremium ? 'Abonné Premium' : 'Utilisateur Standard'}
        </Typography>
      </Box>
      <List component="nav">
        {menuItems?.map((item) => (
          <ListItemButton
            key={item.name}
            component={NavLink}
            to={item.path}

            selected={location.pathname.includes(item.path)}
            sx={{
              '&.Mui-selected': {
                // bgcolor: 'primary.light',
                // bgcolor: '#2C5364',
                bgcolor: '#b4edce',
                color: '#fff',
                '&:hover': {
                  //   bgcolor: 'primary.light',
                  // bgcolor: '#203A43',
                  bgcolor: '#96f7c1',
                },
              },
            }}
          >
            <ListItemIcon  >{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>
      <ToastContainer/>
    </Box>
  );
};

export default AccountSidebar;