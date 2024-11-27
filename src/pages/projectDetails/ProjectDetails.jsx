import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Skeleton,
} from '@mui/material';
import { CheckCircleOutline, Code, Description, Download } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// Import your project data here
import { projectsData } from '../../utils/data/projectsData';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const foundProject = projectsData.find(p => p.id === parseInt(id));
      setProject(foundProject);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDownload = () => {
    if (project.type === 'Gratuit') {
      window.open(project.downloadLink, '_blank');
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Skeleton variant="rectangular" width="100%" height={300} />
        <Skeleton variant="text" sx={{ fontSize: '3rem', mt: 2 }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem', mt: 1 }} width="60%" />
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!project) {
    return <Typography>Projet non trouvé</Typography>;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh'}}>
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={project.imageUrl}
                alt={project.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  {project.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip label={project.category} color="primary" sx={{ mr: 1, bgcolor: '#264653' }} />
                  <Chip 
                    label={project.type} 
                    color={project.type === 'Gratuit' ? 'success' : 'secondary'} 
                    sx={{ mr: 2 }}
                  />
                  <Rating name="read-only" value={project.rating} readOnly />
                </Box>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h5" gutterBottom>
                  Fonctionnalités principales
                </Typography>
                <List>
                  {project?.features?.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircleOutline color="primary" sx={{color: '#11998e'}} />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} >
            <Card sx={{ position: 'sticky', top: theme.spacing(8) }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Téléchargement
                </Typography>
                <Button
                  variant="contained"
                  // color="primary"
                
                  fullWidth
                  startIcon={<Download />}
                  onClick={handleDownload}
                  sx={{ mb: 2, bgcolor: '#11998e', '&:hover':{ bgcolor:'#264653'}  }}
                >
                  {project.type === 'Gratuit' ? 'Télécharger gratuitement' : 'Acheter et télécharger'}
                </Button>
                {project.type === 'Payant' && (
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                    Prix: {project.price}€
                  </Typography>
                )}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Informations techniques
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Code />
                    </ListItemIcon>
                    <ListItemText primary={`Langage: ${project.language}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText primary={`Taille: ${project.size}`} />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Button component={Link} to="/projets" variant="outlined" sx={{color: '#11998e'}}>
            Retour à la liste des projets
          </Button>
        </Box>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Achat du projet</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour télécharger ce projet payant, vous devez d'abord l'acheter. Voulez-vous procéder au paiement ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleCloseDialog} variant="contained" color="primary">
              Procéder au paiement
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ProjectDetails;