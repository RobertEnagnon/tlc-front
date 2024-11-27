import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  PlayCircleOutline,
  CheckCircle,
  NavigateNext,
  NavigateBefore,
  Menu as MenuIcon,
} from '@mui/icons-material';

const TrainingSection = () => {
  const { id, sectionId } = useParams();
  const navigate = useNavigate();
  const [training, setTraining] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainingAndSection = async () => {
      setLoading(true);
      try {
        const trainingResponse = await fetch(`${process.env.REACT_APP_API_URL}/trainings/${id}`);
        if (!trainingResponse.ok) {
          throw new Error('Erreur lors de la récupération des données de formation');
        }
        const trainingData = await trainingResponse.json();
        setTraining(trainingData);

        const section = trainingData.chapters
          .flatMap(chapter => chapter.sections)
          .find(section => section.id === sectionId);
        if (!section) {
          throw new Error('Section non trouvée');
        }
        setCurrentSection(section);

        const totalSections = trainingData.chapters.reduce((acc, chapter) => acc + chapter.sections.length, 0);
        const completedSections = trainingData.chapters.reduce((acc, chapter) => 
          acc + chapter.sections.filter(s => s.completed).length, 0);
        setProgress(Math.round((completedSections / totalSections) * 100));
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingAndSection();
  }, [id, sectionId]);

  const markSectionCompleted = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trainings/${id}/sections/${sectionId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez ici les headers d'authentification si nécessaire
        },
      });
      if (!response.ok) {
        throw new Error('Erreur lors du marquage de la section comme terminée');
      }
      setCurrentSection({ ...currentSection, completed: true });
      const newProgress = Math.round(((progress * training.chapters.reduce((acc, chapter) => acc + chapter.sections.length, 0) / 100 + 1) / 
        training.chapters.reduce((acc, chapter) => acc + chapter.sections.length, 0)) * 100);
      setProgress(newProgress);
    } catch (error) {
      console.error('Erreur:', error);
      // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
    }
  };

  const navigateToSection = (sectionId) => {
    navigate(`/formations/${id}/section/${sectionId}`);
  };

  const findAdjacentSection = (direction) => {
    const allSections = training.chapters.flatMap(chapter => chapter.sections);
    const currentIndex = allSections.findIndex(section => section.id === sectionId);
    return allSections[currentIndex + (direction === 'next' ? 1 : -1)];
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color='success' />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!training || !currentSection) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Aucune donnée disponible</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, mt: { xs: 2, md: 8 }, px: { xs: 2, md: 0 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', mb: 4 }}>
          <IconButton
            sx={{ display: { xs: 'block', md: 'none' }, mr: 2 }}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="h1" gutterBottom>
            {training.title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Barre latérale */}
          <Card
            sx={{
              width: { xs: '100%', md: 300 },
              mr: { md: 4 },
              mb: { xs: 2, md: 0 },
              display: { xs: showSidebar ? 'block' : 'none', md: 'block' },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progression du cours
              </Typography>
              <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" align="center">
                {progress}% complété
              </Typography>
              <List>
                {training.chapters.map((chapter) => (
                  <React.Fragment key={chapter.id}>
                    <ListItem>
                      <ListItemText primary={chapter.title} />
                    </ListItem>
                    <List component="div" disablePadding>
                      {chapter.sections.map((section) => (
                        <ListItem
                          key={section.id}
                          button
                          selected={section.id === sectionId}
                          onClick={() => navigateToSection(section.id)}
                          sx={{ pl: 4 }}
                        >
                          <ListItemIcon>
                            {section.completed ? <CheckCircle color="success" /> : <PlayCircleOutline />}
                          </ListItemIcon>
                          <ListItemText primary={section.title} />
                        </ListItem>
                      ))}
                    </List>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Contenu principal */}
          <Box sx={{ flexGrow: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {currentSection.title}
                </Typography>
                {currentSection.videoUrl && (
                  <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 2 }}>
                    <iframe
                      src={currentSection.videoUrl}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      title={currentSection.title}
                      allowFullScreen
                    />
                  </Box>
                )}
                <Typography variant="body1" paragraph>
                  {currentSection.content}
                </Typography>
                {!currentSection.completed && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={markSectionCompleted}
                    sx={{
                      mt: 2,
                      background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)',
                      '&:hover': {
                        background: 'linear-gradient(to left, #2C5364, #203A43, #0F2027)',
                      },
                    }}
                  >
                    Marquer comme terminé
                  </Button>
                )}
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Tooltip title="Section précédente">
                <span>
                  <IconButton
                    onClick={() => {
                      const prevSection = findAdjacentSection('prev');
                      if (prevSection) navigateToSection(prevSection.id);
                    }}
                    disabled={!findAdjacentSection('prev')}
                  >
                    <NavigateBefore />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title="Section suivante">
                <span>
                  <IconButton
                    onClick={() => {
                      const nextSection = findAdjacentSection('next');
                      if (nextSection) navigateToSection(nextSection.id);
                    }}
                    disabled={!findAdjacentSection('next')}
                  >
                    <NavigateNext />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TrainingSection;