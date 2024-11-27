

import React, { useEffect, useState, useCallback } from 'react';
import {
  Box, Button, Container, Typography, Card, CardContent, CardActions,
  IconButton, LinearProgress, Divider, Chip, Tooltip, Grid, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating,
  Accordion, AccordionSummary, AccordionDetails, Alert, Snackbar, CircularProgress
} from '@mui/material';
import {
  OndemandVideo as OndemandVideoIcon, Pause as PauseIcon, Favorite as FavoriteIcon,
  FiberManualRecord as FiberManualRecordIcon, PlayArrow as PlayArrowIcon,
  Info as InfoIcon, Share as ShareIcon, Download as DownloadIcon,
  Comment as CommentIcon, Star as StarIcon, ExpandMore as ExpandMoreIcon,
  EmojiEvents as EmojiEventsIcon, Lock as LockIcon
} from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TrainingShowBanner from '../../components/TrainingShowBanner/TrainingShowBanner';

const TrainingShow = () => {
  // États pour gérer les données et l'interface utilisateur
  const [training, setTraining] = useState(null);
  const [startLearning, setStartLearning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [comment, setComment] = useState('');
  const [userRating, setUserRating] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  // Récupération des données de formation
  useEffect(() => {
    const fetchTraining = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/trainings/${id}`);
        if (!response.ok) throw new Error('Échec de la récupération des données de formation');
        const data = await response.json();
        setTraining(data);
        calculateProgress(data.chapters);
        // Simuler si la formation a été achetée (à remplacer par une vraie logique)
        setIsPurchased(!data.isPaid || Math.random() > 0.5);
      } catch (error) {
        console.error('Erreur lors de la récupération de la formation:', error);
        setSnackbarMessage("Erreur lors du chargement de la formation.");
        setShowSnackbar(true);
      }
    };

    fetchTraining();
  }, [id]);

  // Calcul de la progression basé sur les sections terminées
  const calculateProgress = useCallback((chapters) => {
    const totalSections = chapters.reduce((acc, chapter) => acc + chapter.sections.length, 0);
    const completedSections = chapters.reduce((acc, chapter) =>
      acc + chapter.sections.filter(section => section.completed).length, 0);
    setProgress(Math.round((completedSections / totalSections) * 100));
  }, []);

  // Basculer le statut de favori
  const toggleFavorite = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trainings/${id}/favorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Inclure le token d'authentification si nécessaire
      });
      if (!response.ok) throw new Error('Échec de la mise à jour du statut de favori');
      setFavorited(!favorited);
      setSnackbarMessage(favorited ? "Retiré des favoris" : "Ajouté aux favoris");
      setShowSnackbar(true);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de favori:', error);
      setSnackbarMessage("Erreur lors de la mise à jour des favoris.");
      setShowSnackbar(true);
    }
  };

  // Démarrer ou continuer la formation
  const handleStartLearning = () => {
    if (!isPurchased && training?.isPaid) {
      setSnackbarMessage("Veuillez acheter cette formation pour commencer.");
      setShowSnackbar(true);
      return;
    }
    setStartLearning(true);
    const firstUncompletedSection = training?.chapters?.flatMap(chapter =>
      chapter.sections.find(section => !section.completed)
    )[0];
    if (firstUncompletedSection) {
      navigate(`/formations/${id}/section/${firstUncompletedSection.id}`);
    }
  };

  // Gérer la soumission des commentaires
  const handleCommentSubmit = async () => {
    if (!comment.trim() || !userRating) {
      setSnackbarMessage("Veuillez fournir un commentaire et une note.");
      setShowSnackbar(true);
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trainings/${id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, rating: userRating }),
        // Inclure le token d'authentification si nécessaire
      });
      if (!response.ok) throw new Error('Échec de la soumission du commentaire');
      setShowCommentDialog(false);
      setComment('');
      setUserRating(null);
      setSnackbarMessage("Commentaire soumis avec succès.");
      setShowSnackbar(true);
    } catch (error) {
      console.error('Erreur lors de la soumission du commentaire:', error);
      setSnackbarMessage("Erreur lors de la soumission du commentaire.");
      setShowSnackbar(true);
    }
  };

  // Partager la formation
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: training?.title,
        text: training?.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      setSnackbarMessage("Partage non pris en charge par votre navigateur.");
      setShowSnackbar(true);
    }
  };

  // Télécharger le certificat
  const handleDownloadCertificate = () => {
    // Logique pour télécharger le certificat
    setSnackbarMessage("Téléchargement du certificat en cours...");
    setShowSnackbar(true);
  };

  if (!training) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;

  return (
    <Box sx={{ flexGrow: 1, mt: { xs: 2, md: '70px' }, px: { xs: 2, md: 0 } }} className="trainingShow mainBg">
      <TrainingShowBanner
        title={training.title}
        banner={training.banner}
        description={training.description}
      />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant='h5' mb={2}>Contenu de la formation</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  flexGrow: 1,
                  mr: 2,
                  background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {progress}% Complété
              </Typography>
            </Box>

            {training?.chapters?.map((chapter) => (
              <Accordion key={chapter.id} sx={{ mb: 2, boxShadow: 3 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6'>
                    {chapter.title}
                    <Chip
                      label={chapter.duration}
                      size="small"
                      sx={{ ml: 2, background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)', color: 'white' }}
                    />
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {chapter?.sections?.map(section => (
                    <Box key={section.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {!isPurchased && training.isPaid ? (
                        <Tooltip title="Contenu verrouillé">
                          <LockIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        </Tooltip>
                      ) : section.completed ? (
                        <Tooltip title="Terminé">
                          <FiberManualRecordIcon sx={{ mr: 1, color: 'success.main' }} />
                        </Tooltip>
                      ) : startLearning ? (
                        <PauseIcon sx={{ mr: 1, cursor: 'pointer' }} onClick={() => {/* Gérer la pause */ }} />
                      ) : (
                        <PlayArrowIcon sx={{ mr: 1, cursor: 'pointer' }} onClick={() => {/* Gérer la lecture */ }} />
                      )}
                      <Typography sx={{ flexGrow: 1 }}>{section.title}</Typography>
                      <Typography color="text.secondary" sx={{ ml: 2 }}>{section.duration}</Typography>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}

            <Typography variant='h5' mt={4} mb={2}>FAQ</Typography>
            {/* {training.faq.map((item, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant='h6' fontSize={16}>{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))} */}

            <Accordion >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h6' fontSize={16}  >{'Comment aller vite?'}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, consequatur.</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h6' fontSize={16}>{'La formation termine quand?'}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, consequatur.</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h6' fontSize={16}>{'Comment aller vite?'}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, consequatur.</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant='h6' mb={2}>Présentation</Typography>
                {training.presentationVideo ? (
                  <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
                    <iframe
                      src={`${process.env.REACT_APP_API_URL}/${training.presentationVideo}`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      title="Vidéo de présentation"
                      allowFullScreen
                      
                    />
                  </Box>
                ) : (
                  <Typography color="text.secondary" mb={2}>Vidéo de présentation non disponible.</Typography>
                )}

                <Typography variant="body2" color="text.secondary" mb={2}>
                  {training.details}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={training.instructor?.avatar} sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle2">Instructeur</Typography>
                    <Typography variant="body2">{training.instructor?.name}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant='subtitle1' gutterBottom>Compétences acquises</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {training?.skills?.map((skill, index) => (
                    <Chip key={index} label={skill} size="small" />
                  ))}
                </Box>

                <Typography variant='subtitle1' gutterBottom>Informations</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <InfoIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      {training.projectsNumber} Projets
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <StarIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      {training?.rating?.toFixed(1)} / 5
                    </Typography>
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(to left, #2C5364, #203A43, #0F2027)',
                    },
                  }}
                  onClick={handleStartLearning}
                >
                  {!isPurchased && training.isPaid ? `Acheter (${training.price}€)` : startLearning ? 'Continuer' : 'Démarrer'}
                </Button>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Tooltip title={favorited ? "Retirer des favoris" : "Ajouter aux favoris"}>
                  <IconButton onClick={toggleFavorite} color={favorited ? "secondary" : "default"}>
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Partager">
                  <IconButton onClick={handleShare}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Télécharger les ressources">
                  <IconButton disabled={!isPurchased && training.isPaid}>
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Laisser un commentaire">
                  <IconButton onClick={() => setShowCommentDialog(true)}>
                    <CommentIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>

            <Card sx={{ mb: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant='h6' mb={2}>Ressources</Typography>
                <Grid container spacing={2}>
                  {training?.resources?.map((resource, index) => (
                    <Grid item xs={12} key={index}>
                      <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<DownloadIcon />}
                        onClick={() => window.open(resource.url, '_blank')}
                        disabled={!isPurchased && training.isPaid}
                      >
                        {resource.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {progress === 100 && (
              <Button
                variant="contained"
                fullWidth
                startIcon={<EmojiEventsIcon />}
                onClick={handleDownloadCertificate}
                sx={{
                  mt: 2,
                  background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(to left, #2C5364, #203A43, #0F2027)',
                  },
                }}
              >
                Télécharger le certificat
              </Button>
            )}
          </Grid>
        </Grid>
      </Container>

      <Dialog open={showCommentDialog} onClose={() => setShowCommentDialog(false)}>
        <DialogTitle>Laisser un commentaire</DialogTitle>
        <DialogContent>
          <Rating
            name="user-rating"
            value={userRating}
            onChange={(event, newValue) => {
              setUserRating(newValue);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Votre commentaire"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCommentDialog(false)}>Annuler</Button>
          <Button onClick={handleCommentSubmit}>Soumettre</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}

export default TrainingShow;