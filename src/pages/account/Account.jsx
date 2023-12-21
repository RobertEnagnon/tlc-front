import React, { useEffect, useState } from 'react'
import "./Account.css";
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { GolfCourse as GolfCourseIcon, History, Info as InfoIcon, Subscript, Train } from '@mui/icons-material';
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
        <Box sx={{ flexGrow: 1, mt: '70px' }} className="mainBg">
            <Box sx={{ m: 5 }} >
                <Typography variant='h5' color={'GrayText'} sx={{ mt: 5, ml: 'auto', textAlign: "right", width: { lg: "65%", md: "83%", sm: "100%" } }} >
                    vueillez apprendre plus facilement et à votre rythme. <br />
                    Vivez notre expérience
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: {md:'row', sm: 'column', xs:'column'} }} >
                    {/* Le sidebar du coté gauche */}
                    <Box sx={{ mr: "auto", width: { lg: '25%', md: '33%', sm: '100%' } }} className="side" >
                        <Typography variant='h5' color={'GrayText'} >Votre profil</Typography>
                        <TextField sx={{ my: 4, width: '100%' }} type="search" placeholder="Recherche" />
                        <List component={'aside'} >
                            <ListItemButton selected={selectedIndex === 0}
                                onClick={(event) => handleListItemClick(event, 0)}>
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="Profil" />
                            </ListItemButton>
                            <ListItemButton selected={selectedIndex === 1}
                                onClick={(event) => handleListItemClick(event, 1)}>
                                <ListItemIcon>
                                    <History />
                                </ListItemIcon>
                                <ListItemText primary="Historique" />
                            </ListItemButton>
                            <ListItemButton selected={selectedIndex === 2}
                                onClick={(event) => handleListItemClick(event, 2)}>
                                <ListItemIcon>
                                    <Subscript />
                                </ListItemIcon>
                                <ListItemText primary="Abonnements" />
                            </ListItemButton>
                            <ListItemButton selected={selectedIndex === 3}
                                onClick={(event) => handleListItemClick(event, 3)}>
                                <ListItemIcon>
                                    <Train />
                                </ListItemIcon>
                                <ListItemText primary="Mes Formations" />
                            </ListItemButton>
                        </List>
                    </Box>
                    <Box border={'1px #ccc solid'} sx={{ mt: 3,py:5, width: { lg: '70%', md: '60%', sm: '100%' } }} >

                        <table  style={{ margin:"auto", width: '80%', color: 'GrayText' }} >
                            <Typography color={'GrayText'} sx={{mb:3}}>Informations personnelles</Typography>
                            <tr>
                                <th>Nom d'utilisateur</th>
                                <td style={{padding:'0 10px'}} >{auth?.firstname} </td>
                                <td><Link style={{color: '#23856d'}}  to="/reset-name">Modifier</Link></td>
                            </tr>
                            <Divider  sx={{width: '300%'}} />
                            <tr>
                                <th>Adresse email</th>
                                <td style={{padding:'0 10px'}} >{auth?.email} </td>
                                <td><Link style={{color: '#23856d'}} to="/reset-email">Mettre à jours</Link></td>
                            </tr>
                            <Divider  sx={{width: '300%'}} />
                            <tr>
                                <th>Mot de passe</th>
                                <td class="h4 px-5">. . . . . . . . . </td>
                                <td><Link style={{color: '#23856d'}} to="/reset-password">Modifier</Link></td>
                            </tr>
                            <Divider  sx={{width: '300%'}} />
                            <tr>
                                <th>Adresse du domicile</th>
                                <td style={{padding:'0 10px'}} >{auth?.address} </td>
                                <td><Link style={{color: '#23856d'}} to="/reset-address">Mettre à jours</Link></td>
                            </tr>
                        </table>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Account