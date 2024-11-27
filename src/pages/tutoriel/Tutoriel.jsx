

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TutorialList from '../../components/tutorialList/TutorialList'
import { createTheme } from '@mui/material/styles';

// Création d'un thème personnalisé avec les couleurs de la plateforme
const theme = createTheme({
  palette: {
    primary: {
      main: '#264653',
    },
    secondary: {
      main: 'rgb(0, 255, 157)',
    },
    background: {
      default: '#fff',
      paper: '#0F2027',
    },
    text: {
      primary: '#264653',
      secondary: '#11998e',
    },
  },
});

const Tutoriel = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TutorialList />
    </ThemeProvider>
  );
};

export default Tutoriel;