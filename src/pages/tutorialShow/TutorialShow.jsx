import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Box, CircularProgress, Alert,Typography, Snackbar } from '@mui/material';
import { Helmet } from 'react-helmet';
import TutorialHeader from '../../components/tutorial/TutorialHeader';
import TutorialInfo from '../../components/tutorial/TutorialInfo';
import CommentSection from '../../components/tutorial/CommentSection';
import RelatedTutorials from '../../components/tutorial/RelatedTutorials';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';

export default function TutorialShow() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedTutorials, setRelatedTutorials] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/tutorials/${id}`);
        if (!res.ok) throw new Error('Erreur lors du chargement du tutoriel');
        const data = await res.json();
        setTutorial(data);
        setCurrentUser(JSON.parse(localStorage.getItem('currentUser') || 'null'));
        
        // const relatedRes = await fetch(`${process.env.REACT_APP_API_URL}/tutorials/related/${id}`);
        // if (!relatedRes.ok) throw new Error('Erreur lors du chargement des tutoriels associés');
        // const relatedData = await relatedRes.json();
        // setRelatedTutorials(relatedData);
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (isLoading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  if (error) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Alert severity="error">{error}</Alert></Box>;
  if (!tutorial) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Typography>Tutoriel non trouvé</Typography></Box>;

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
      <Helmet>
        <title>{tutorial.title} | The Legend Code</title>
        <meta name="description" content={tutorial.content.substring(0, 160)} />
        <meta property="og:title" content={tutorial.title} />
        <meta property="og:description" content={tutorial.content.substring(0, 160)} />
        <meta property="og:image" content={tutorial.thumbnail} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <BreadcrumbNavigation title={tutorial.title} />

      <TutorialHeader title={tutorial.title} videoUrl={tutorial.video} />

      <Grid container spacing={4} position={'relative'} >
        <Grid item xs={12} md={8}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              À propos de ce tutoriel
            </Typography>
            <Typography variant="body1" paragraph>
              {tutorial.content}
            </Typography>
          </Box>
          <CommentSection 
            tutorialId={id} 
            comments={tutorial.tcomments} 
            currentUser={currentUser}
            onCommentUpdate={(updatedComments) => setTutorial({...tutorial, tcomments: updatedComments})}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={{position: 'sticky', top: 20, alignSelf: 'flex-start' }} >
          <TutorialInfo 
            level={tutorial.level} 
            technologies={tutorial.technologies} 
            author={tutorial.user}
            videoUrl={tutorial.video}
            currentUser={currentUser}
            tutorialId={id}
          />
          <RelatedTutorials tutorials={relatedTutorials} />
        </Grid>
      </Grid>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%', bgcolor: "red" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}