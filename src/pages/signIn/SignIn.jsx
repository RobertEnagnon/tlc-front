import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate, useNavigate } from 'react-router-dom';

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

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [currentUser, setCurrentUser] = useState(null)

  const navigate = useNavigate();

  // Methode de connexion
  const handleSubmit = async (event) => {
    event.preventDefault();
    // On définit les entêtes
    const headers = {
      "Content-Type": "application/json",
    };

    if (!email || !password) {
      setMessage("Veuillez remplir tous les champs")
    } else {

      // Envoi des données vers l'API
      try {
        const res = await fetch(process.env.REACT_APP_API_URL + "/auth/signin", {
          method: "POST",body: JSON.stringify({ email: email, password: password }),headers });
          const data = await res.json();

            // S'il y a un message d'erreur de connexion
            if (data.response?.error) {
              setMessage(data.response.message);
            } else {
              // Si tout se passe bien,on enregistre l'utilisateur qui vient de se connecter dans localstorage
              localStorage.setItem("currentUser", JSON.stringify(data))
              // setMessage("Connexion effectuée avec sucèss")
              setCurrentUser(data);
              // On se rédirrige vers la page d'accueil
              navigate("/");
            }

      } catch (error) {
        console.error(error);
        setMessage(error.message);
      }
    }
  };

  // Juste pour vérifier si le user est dèjà connecté
useEffect(() => {
  setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
}, []);


  return (
    <ThemeProvider theme={defaultTheme} >
      {currentUser ? <Navigate to={"/"} replace={true}/> : (
        <Grid container component="main" sx={{ height: '100vh', mt: "70px" }} >
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Se connecter
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                {/* Messages d'erreurs */}
                {message && <p style={{ color: 'red', textAlign:'center' }}>{message}</p>}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  autoFocus
                  value={email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="btnFirst"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Se connecter
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="#" style={{ color: '#01adf7', textDecoration: 'underline' }} >
                      Mot de passe oublié?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" style={{ color: '#01adf7', textDecoration: 'underline' }}>
                      {"Vous n'avez pas de compte? S'inscrire"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
}