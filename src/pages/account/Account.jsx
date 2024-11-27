

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import AccountSidebar from '../../components/accountSidebar/AccountSidebar';
import ProfileInfo from '../../components/profileInfo/ProfileInfo';
import History from '../../components/history/History';
import Subscriptions from '../../components/subscriptions/Subscriptions';
import MyTrainings from '../../components/myTrainings/MyTrainings';
import AccountSettings from '../../components/accountSettings/AccountSettings';
import { useAppContext } from '../../context/appContext';
import useFetch from '../../utils/useFetch';

function Account() {
  // const [auth, setAuth] = useState(null);
  const { auth, setAuth, getCurrentUser, userProfile,setUserProfile, getProfile } = useAppContext();
  // const [userProfile, setUserProfile] = useState(null);


//   const getProfile = async () => {
//     // On définit les entêtes
//     const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${auth?.token}`
//     };

//     try {
//         const resp = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
//             headers
//         });
//         const data = await resp?.json();
//         setUserProfile(data);
//         console.log(data);
//     } catch (error) {
//       console.error("Erreur: ", error.message);
//     }
// };

  useEffect(() => {
    const getAuth = async () => setAuth(await getCurrentUser());
    getAuth()
    if(!userProfile)
      getProfile()
  }, [auth]);

  // if (!userProfile) {
  //   const { apiData: profile } = useFetch(`${process.env.REACT_APP_API_URL}/users/profile`, auth?.token)
  //   console.log(profile);
  //   setUserProfile(profile)
  // }

  if (!auth) {
    return <Navigate to="/signin" replace={true} />;
  }






  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh', pt: { xs: 10, sm: 11 } }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Tableau de bord
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Bienvenue, {auth?.firstname}. Gérez votre compte et suivez votre progression.
          </Typography>
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* <AccountSidebar auth={{...auth,photo: userProfile?.photo}} /> */}
          <AccountSidebar />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="profile" element={<ProfileInfo auth={{...auth,...userProfile}}   />} />
              <Route path="history" element={<History auth={{...auth,...userProfile}}  />} />
              <Route path="subscriptions" element={<Subscriptions auth={{...auth,...userProfile}}  />} />
              <Route path="trainings" element={<MyTrainings auth={{...auth,...userProfile} } />} />
              <Route path="settings" element={<AccountSettings auth={{...auth,...userProfile}}  />} />
              <Route path="*" element={<Navigate to="profile" replace />} />
            </Routes>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Account;