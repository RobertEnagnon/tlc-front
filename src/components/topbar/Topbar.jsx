import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';
import "./Topbar.css"
import {
  Home as HomeIcon,
  Movie as MovieIcon,
  Grade as GradeIcon,
  PersonAddAlt1 as PersonAddAlt1Icon,
  Login as LoginIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  TipsAndUpdates as TipsAndUpdatesIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Notifications
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, IconButton, Stack, SwipeableDrawer } from '@mui/material';

import Logo from "../../assets/images/thelegendcode.png";
import profile from "../../assets/images/noavatar.jpg";


const Topbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  // propriété d'ouverture du dropdown de user profil
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // ON récupère l'utilisateur courent
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
  }, [localStorage.getItem("currentUser")]);

  // Fonction d'ouverture du menu
  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  // Fonction de fermeture du menu
  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  // La deconnexion
  const handleLogout = async () => {
    try {
      localStorage.setItem("currentUser", null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: `#108643` }}>
        <Toolbar sx={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center'
        }}
        >
          <Box className="left-brand" sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            <Link
              to='/'
              color="inherit"
            >
              <Button className="logo" sx={{ fontSize: '20px', color: 'white' }}>
                <img src={Logo} alt="logo ronasdev" width={60} height={60} /> The Legend Code
              </Button>
            </Link>
            <IconButton
              className='humberger'
              color="inherit"
              edge="start"
              onClick={handleMenuOpen}
              sx={{ ml: "auto" }}
            >
              <MenuIcon />
            </IconButton>
            {/* Barre de menu du laterale,c-à-d de la gauche */}
            <SwipeableDrawer
              anchor="left"
              open={isMenuOpen}
              onClose={handleMenuClose}
              onOpen={handleMenuOpen}>
              <Box
                sx={{ width: 250, height: "100%" }}
                role="presentation"
                onClick={handleMenuClose}
                onKeyDown={handleMenuClose}
                className="side-bar"
              >
                <Stack spacing={2} p={2}>
                  <Link to="/" className='link'>
                    <Stack direction={'row'} spacing={1}><HomeIcon /><span>Accueil</span></Stack>
                  </Link>
                  <Link to="/tutoriels" className='link'>
                    <Stack direction='row' spacing={1}><MovieIcon /><span>Tutoriels</span></Stack>
                  </Link>
                  <Link to="/formations" className='link'>
                    <Stack direction={'row'} spacing={1}><TipsAndUpdatesIcon /><span>Formations</span></Stack>
                  </Link>
                  <Link to="/premium" className='link'>
                    <Stack direction='row' spacing={1}><GradeIcon /><span>Premium</span></Stack>
                  </Link>
                  <Link to="/projets" className='link'>
                    <Stack direction='row' spacing={1}><WorkspacePremiumIcon /><span>Projets</span></Stack>
                  </Link>
                </Stack>
                {currentUser ?
                  (
                    <div className="user" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                      <img src={!(currentUser?.photo) ? profile : process.env.REACT_APP_API_URL + "/" + currentUser?.photo?.src} className='profile' alt="" />

                      <ArrowDropDownIcon className='arrowDropdown' /><span style={{ color: 'white',marginLeft:20 }}>{currentUser?.firstname}</span>
                      {open && (
                        <div className="options">
                          {currentUser.role === "admin" && (
                            <>
                              <Link className="link" to="/">
                                Tableau de bord
                              </Link>
                            </>
                          )}
                          <Link className="link" to="/profile">
                            Profil
                          </Link>
                          <Link className="link" style={{ color: 'red' }} onClick={handleLogout}>
                            Déconnexion
                          </Link>
                        </div>
                      )}
                    </div>
                  ) :
                  (<Stack direction={'column'} className="compte" divider={<Divider orientation="vertical" flexItem light={true}
                    sx={{ borderColor: 'white' }} />} >

                    <Link to="/signup" className='link'>
                      <Stack direction='row' fontSize={16} sx={{ whiteSpace: "noWrap" }} spacing={1}><PersonAddAlt1Icon /><span>S'inscrire</span></Stack>
                    </Link>
                    <Link to="/signin" className='link'>
                      <Stack direction='row' fontSize={16} sx={{ whiteSpace: "noWrap" }} spacing={1}><LoginIcon /><span>Se connecter</span></Stack>
                    </Link>
                  </Stack>)
                }
              </Box>
            </SwipeableDrawer>
          </Box>

          {/* Barre du menu horinzontale du haut */}
          <Stack className="navbar" direction={'row'}
            spacing={1}>
            <Link to="/" className='link'>
              <Stack direction={'row'} spacing={1} ><HomeIcon /><span>Accueil</span></Stack>
            </Link>
            <Link to="/tutoriels" className='link'>
              <Stack direction='row' spacing={1}><MovieIcon /><span>Tutoriels</span></Stack>
            </Link>
            <Link to="/formations" className='link'>
              <Stack direction={'row'} spacing={1}><TipsAndUpdatesIcon /><span>Formations</span></Stack>
            </Link>
            <Link to="/premium" className='link'>
              <Stack direction='row' spacing={1}><GradeIcon /><span>Premium</span></Stack>
            </Link>
            <Link to="/projets" className='link'>
              <Stack direction='row' spacing={1}><WorkspacePremiumIcon /><span>Projets</span></Stack>
            </Link>

            <Stack direction={'row'} className="compte" divider={<Divider orientation="vertical" flexItem light={true}
              sx={{ borderColor: 'white' }} />} >
              {currentUser ?
                (
                  <div className="user" onClick={() => setOpen(!open)}>
                    <img src={!(currentUser?.photo) ? profile : process.env.REACT_APP_API_URL + "/" + currentUser?.photo?.src} className='profile' alt="" />
                    <ArrowDropDownIcon className='arrowDropdown' /><span style={{ marginLeft: 20 }}> {currentUser?.firstname}</span>
                    {open && (
                      <div className="options">
                        {currentUser?.role === "admin" && (
                          <>
                            <Link className="link" to="/">
                              Tableau de bord
                            </Link>
                          </>
                        )}
                        <Link className="link" to="/account" style={{ display:'flex', alignItems:'center' }}>
                          <SettingsIcon  sx={{mr:1}} />
                          <span >Compte et paramètres</span>
                        </Link>
                        <Divider />
                        <Link className="link" to="/account" style={{ display:'flex', alignItems:'center' }}>
                          <Notifications  sx={{mr:1}} />
                          <span >Notifications</span>
                        </Link>
                        <Divider />
                        <Link className="link" style={{ color: "red", display:'flex', alignItems:'center' }} onClick={handleLogout}>
                          <LogoutIcon sx={{mr:1}} />
                          <span>Déconnexion</span>
                        </Link>
                      </div>
                    )}
                  </div>
                ) :
                (
                  <>
                    <Link to="/signup" className='link'>
                      <Stack direction='row' fontSize={16} sx={{ whiteSpace: "noWrap" }} spacing={1}><PersonAddAlt1Icon /><span>S'inscrire</span></Stack>
                    </Link>
                    <Link to="/signin" className='link'>
                      <Stack direction='row' fontSize={16} sx={{ whiteSpace: "noWrap" }} spacing={1}><LoginIcon /><span>Se connecter</span></Stack>
                    </Link>
                  </>
                )
              }
            </Stack>
          </Stack>

        </Toolbar>
      </AppBar>
    </Box>
  )
}


export default Topbar;

