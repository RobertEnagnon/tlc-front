import React from 'react'
import "./AccountSidebar.css";
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import {
    History as HistoryIcon,
    Info as InfoIcon, Subscript as SubscriptIcon, Train as TrainIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import profile from "../../assets/images/noavatar.jpg";
import { Link } from 'react-router-dom';


const AccountSidebar = ({ auth, selectedIndex, handleListItemClick }) => {
    return (
        <Box sx={{ mr: "auto", width: { lg: '25%', md: '33%', sm: '100%' } }} className="side" >
            <Typography variant='h5' color={'GrayText'} >Votre profil</Typography>
            <Box
                mt={1}
                border={"1px #ccc solid"} p={2}
                borderBottom={"5px solid #108643"}
                borderRadius={2}
                boxShadow={3}
                display={'flex'}
                flexDirection={'row'}
                alignItems={'baseline'}
            >
                <Box width={70} height={70} mr={5} position={'relative'}>
                    <img src={!(auth?.photo) ? profile : process.env.REACT_APP_API_URL + "/" + auth?.photo?.src}
                        style={{ width: '100%', height: '100%', borderRadius: "50%" }}
                    />
                    <Link style={{
                        width: 30, height: 30,
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        display: "flex", justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top:"50%",
                        right: "-25%",
                        border: "1px solid #ccc",
                        boxShadow: "0px 0px 4px #ccc",
                    }}
                    className='editLink'
                    >
                        <EditIcon sx={{ color: '#108643' }} />
                    </Link>
                </Box>
                <Typography variant='h4' fontSize={'18px'}>{`${auth?.firstname} ${auth?.lastname}`}</Typography>
            </Box>
            {/* <Divider sx={{ borderBottomWidth: 2, my: 1 }} /> */}
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
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Historique" />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemIcon>
                        <SubscriptIcon />
                    </ListItemIcon>
                    <ListItemText primary="Abonnements" />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}>
                    <ListItemIcon>
                        <TrainIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mes Formations" />
                </ListItemButton>
            </List>
        </Box>
    )
}

export default AccountSidebar