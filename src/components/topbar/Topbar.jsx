
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
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Divider, IconButton, Stack, SwipeableDrawer, Menu, MenuItem, ListItemIcon, Badge, Avatar, Typography } from '@mui/material';

import Logo from "../../assets/images/thelegendcode.png";
import profile from "../../assets/images/noavatar.jpg";
import { useAppContext } from '../../context/appContext';

const Topbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // propriété d'ouverture du dropdown de user profil
  const [open, setOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);
  const { auth, setAuth, userProfile, getCurrentUser, notificationCount, setNotificationCount } = useAppContext()


  const navigate = useNavigate();

  useEffect(() => {
    const getAuth = async () => setAuth(await getCurrentUser());
    getAuth()
    console.log('topbar auth: ', auth);
    // Simulating fetching notification count
    setNotificationCount(3);
  }, [navigate]);

  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`
      };

      const res = await fetch(process.env.REACT_APP_API_URL + "/auth/logout", {
        method: "POST", headers
      });
      const data = await res.json();
      console.log("logout: ", data);
      localStorage.removeItem("currentUser");
      setAuth(null);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
    handleUserMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#108643' }}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box className="left-brand" sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            <Link to='/' color="inherit">
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
            {/* Le menu sur mobile */}
            <SwipeableDrawer
              anchor="left"
              open={isMenuOpen}
              onClose={handleMenuClose}
              onOpen={handleMenuOpen}
            >
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

                <Stack direction={'row'} className="user" divider={<Divider orientation="vertical" flexItem light={true} sx={{ borderColor: 'white' }}  onMouseLeave={handleUserMenuClose} />}>
                  {auth !== null && auth !== undefined ? (
                    <>
                      <IconButton color="inherit" component={Link} to="/notifications">
                        <Badge badgeContent={notificationCount} color="error">
                          <NotificationsIcon color='#fff' />
                        </Badge>
                      </IconButton>
                      <IconButton
                        // onClick={handleUserMenuOpen}
                        onMouseEnter={handleUserMenuOpen} 
                        // onMouseLeave={handleUserMenuClose}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                      >
                        {
                          auth?.photo ||  userProfile?.photo ?
                            <Avatar
                              src={`${auth?.photo ?? userProfile?.photo}`}
                              sx={{ width: 32, height: 32 }}
                            />
                            :
                            <Box sx={{ width: 32, height: 32, borderRadius: 16, display: 'grid', placeItems: 'center', bgcolor: '#dfdddd', color: '#271033' }} >
                              <Typography variant='subtitle2' >{auth?.firstname?.charAt(0)}</Typography>
                            </Box>
                        }
                      </IconButton>

                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={Boolean(anchorEl)}
                        onClose={handleUserMenuClose}
                        onClick={handleUserMenuClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem component={Link} to="/account">
                          <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                          </ListItemIcon>
                          Mon profil
                        </MenuItem>
                        <MenuItem component={Link} to="/account/settings">
                          <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                          </ListItemIcon>
                          Paramètres
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                          </ListItemIcon>
                          Déconnexion
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Link to="/signup" className='link'>
                        <Stack direction='row' fontSize={16} sx={{ whiteSpace: "noWrap" }} spacing={1}><PersonAddAlt1Icon /><span>S'inscrire</span></Stack>
                      </Link>
                      <Link to="/signin" className='link'>
                        <Stack direction='row' fontSize={16} sx={{ whiteSpace: "noWrap" }} spacing={1}><LoginIcon /><span>Se connecter</span></Stack>
                      </Link>
                    </>
                  )}
                </Stack>
              </Box>
            </SwipeableDrawer>
          </Box>

          {/* L'ensemble des menus sur gand ecran */}
          <Stack className="navbar" direction={'row'} spacing={1}>
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

            <Stack direction={'row'} className="compte" divider={<Divider orientation="vertical" flexItem light={true} sx={{ borderColor: 'white' }} />}>
              {auth !== null && auth !== undefined ? (
                <>
                  <IconButton color="inherit" component={Link} to="/notifications">
                    <Badge badgeContent={notificationCount} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    onClick={handleUserMenuOpen}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                  >
                    {
                      auth?.photo || userProfile?.photo ?
                        <Avatar
                          src={`${auth?.photo ?? userProfile?.photo}`}
                          sx={{ width: 32, height: 32 }}
                        />
                        :
                        <Box sx={{ width: 32, height: 32, borderRadius: 16, display: 'grid', placeItems: 'center', bgcolor: '#dfdddd', color: '#271033' }} >
                          <Typography variant='subtitle2' >{auth?.firstname?.charAt(0)}</Typography>
                        </Box>
                    }
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={Boolean(anchorEl)}
                    onClose={handleUserMenuClose}
                    onClick={handleUserMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem component={Link} to="/account">
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      Mon profil
                    </MenuItem>
                    <MenuItem component={Link} to="/account/settings">
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      Paramètres
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      Déconnexion
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Link to="/signup" className='link'>
                    <Stack direction='row' fontSize={16} sx={{ whiteSpace: "noWrap" }} spacing={1}><PersonAddAlt1Icon /><span>S'inscrire</span></Stack>
                  </Link>
                  <Link to="/signin" className='link'>
                    <Stack direction='row' fontSize={16} sx={{ whiteSpace: "noWrap" }} spacing={1}><LoginIcon /><span>Se connecter</span></Stack>
                  </Link>
                </>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Topbar;