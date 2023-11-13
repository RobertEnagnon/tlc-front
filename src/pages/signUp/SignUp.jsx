import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="https://ronasdev.go.yo.fr">
        ronasdev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    photoId: null,
    password: '',
    confirmedPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Méhode pour remplir les différentes propriétés de user
  const handleChange = (e) => {
    // On passe une fonction à setUser
    // Elle prend les valeur précedentes de user et ajoute avec destructuration la nouvelle valeur ajoutée
    setUser(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  // Méthode de soumission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    if (!user.firstname || !user.lastname || !user.email) {
      setMessage('Veuillez remplir tous les champs')
    }else{
      try {
        const headers = {"Content-Type": "application/json"};
        const res = await fetch(process.env.REACT_APP_API_URL+'/auth/signup',{
          method: 'POST', body: JSON.stringify(user), headers
        });
        const data = await res.json();
        // S'il y a un message d'erreur de connexion
        console.log(data);
        if (data.error) {
          setMessage(data.message);
        }else{
          navigate('/');
        }

      } catch (error) {
        
        console.log(error)
      }
    }


  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ background: '#fff', mb: 5, pb: 2, borderRadius: 5,mt:'70px' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'inscrire
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {message && <p style={{color:'red', textAlign:'center'}}>{message}</p> }
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  label="Prénom"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Adresse Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="mot de passe"
                  type="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmedPassword"
                  label="confirmation du mot de passe "
                  type="password"
                  onChange={handleChange}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Je veux être au courant de tous les nouveaux tutoriels, formations et projets de la plateforme."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="btnFirst"
            >
              S'inscrire
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">
                  <span style={{ color: '#01adf7', textDecoration: 'underline' }}>Avez-vous déjà un compte? Se connecter</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 4 }} />
      </Container>
    </ThemeProvider>
  );
}