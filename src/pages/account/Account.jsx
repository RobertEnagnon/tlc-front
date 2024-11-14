import React, { useEffect, useState } from 'react'
import "./Account.css";
import { Box, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import AccountSidebar from '../../components/accountSidebar/AccountSidebar';
import ProfilInfoBoard from '../../components/profilInfoBoard/ProfilInfoBoard';
function Account() {
    const [auth, setAuth] = useState(null)
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setAuth(currentUser)
    }, [localStorage.getItem('currentUser')])

    return (
        <Box sx={{ flexGrow: 1, mt: '80px' }} className="mainBg">
            <Box sx={{ m: 5 }} >
                <Typography variant='h5' color={'GrayText'} sx={{ mt: 5, ml: 'auto', textAlign: "right", width: { lg: "65%", md: "83%", sm: "100%" } }} >
                    vueillez apprendre plus facilement et à votre rythme. <br />
                    Vivez notre expérience
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: {md:'row', sm: 'column', xs:'column'} }} >
                    {/* Le sidebar du coté gauche */}
                  <AccountSidebar auth={auth} selectedIndex={selectedIndex} handleListItemClick={handleListItemClick} />

                    {/* Tableaux du profil */}
                    <ProfilInfoBoard auth={auth} />
                </Box>
            </Box>
        </Box>
    )
}

export default Account