import React from 'react'
import "./ProfilInfoBoard.css";
import { Box, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ProfilInfoBoard = ({auth}) => {
    return (
        <Box border={'1px #ccc solid'} sx={{ mt: 3, py: 5, width: { lg: '70%', md: '60%', sm: '100%' } }} >

            <table style={{ margin: "auto", width: '80%', color: 'GrayText' }} >
                <Typography color={'GrayText'} sx={{ mb: 3 }}>Informations personnelles</Typography>
                <tr>
                    <th>Nom d'utilisateur</th>
                    <td style={{ padding: '0 10px' }} >{auth?.firstname} </td>
                    <td><Link style={{ color: '#23856d' }} to="/reset-name">Modifier</Link></td>
                </tr>
                <Divider sx={{ width: '300%' }} />
                <tr>
                    <th>Adresse email</th>
                    <td style={{ padding: '0 10px' }} >{auth?.email} </td>
                    <td><Link style={{ color: '#23856d' }} to="/reset-email">Mettre à jours</Link></td>
                </tr>
                <Divider sx={{ width: '300%' }} />
                <tr>
                    <th>Mot de passe</th>
                    <td class="h4 px-5">. . . . . . . . . </td>
                    <td><Link style={{ color: '#23856d' }} to="/reset-password">Modifier</Link></td>
                </tr>
                <Divider sx={{ width: '300%' }} />
                <tr>
                    <th>Adresse du domicile</th>
                    <td style={{ padding: '0 10px' }} >{auth?.address} </td>
                    <td><Link style={{ color: '#23856d' }} to="/reset-address">Mettre à jours</Link></td>
                </tr>
            </table>
        </Box>
    )
}

export default ProfilInfoBoard