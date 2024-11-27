// import React, { useState } from 'react';
// import { 
//   Typography, 
//   Box, 
//   Chip, 
//   Divider, 
//   Avatar, 
//   Button, 
//   IconButton, 
//   Paper 
// } from '@mui/material';
// import { 
//   Favorite as FavoriteIcon, 
//   GetApp as GetAppIcon, 
//   Share as ShareIcon 
// } from '@mui/icons-material';

// export default function TutorialInfo({ level, technologies, author, videoUrl, currentUser, tutorialId }) {
//   const [liked, setLiked] = useState(false);

//   const handleLike = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/tutorials/${tutorialId}/like`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId: currentUser.id }),
//       });
//       if (!res.ok) throw new Error('Erreur lors de l\'ajout du like');
//       setLiked(!liked);
//     } catch (error) {
//       console.error('Erreur:', error);
//     }
//   };

//   const handleShare = () => {
//     navigator.share({
//       title: level.title,
//       text: 'Découvrez ce tutoriel intéressant !',
//       url: window.location.href,
//     }).catch((error) => console.log('Erreur de partage', error));
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         Informations sur le tutoriel
//       </Typography>
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="subtitle2">Niveau :</Typography>
//         <Chip label={level.title} color="primary" size="small" />
//       </Box>
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="subtitle2">Technologies :</Typography>
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
//           {technologies.map((tech) => (
//             <Chip key={tech.title} label={tech.title} size="small" />
//           ))}
//         </Box>
//       </Box>
//       <Divider sx={{ my: 2 }} />
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//         <Avatar
//           src={author.photo ? `${process.env.REACT_APP_API_URL}/${author.photo.src}` : undefined}
//           sx={{ mr: 2 }}
//         >
//           {author.firstname[0]}
//         </Avatar>
//         <Box>
//           <Typography variant="subtitle2">Auteur :</Typography>
//           <Typography variant="body2">
//             {`${author.firstname} ${author.lastname}`}
//           </Typography>
//         </Box>
//       </Box>
//       <Button
//         variant="contained"
//         startIcon={<GetAppIcon />}
//         fullWidth
//         href={videoUrl}
//         target="_blank"
//         download
//       >
//         Télécharger
//       </Button>
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//         <IconButton onClick={handleLike} color={liked ? "primary" : "default"}>
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton onClick={handleShare}>
//           <ShareIcon />
//         </IconButton>
//       </Box>
//     </Paper>
//   );
// }

import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Chip, 
  Divider, 
  Avatar, 
  Button, 
  IconButton, 
  Paper 
} from '@mui/material';
import { 
  Favorite as FavoriteIcon, 
  GetApp as GetAppIcon, 
  Share as ShareIcon 
} from '@mui/icons-material';

export default function TutorialInfo({ level, technologies, author, videoUrl, currentUser, tutorialId }) {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tutorials/${tutorialId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id }),
      });
      if (!res.ok) throw new Error('Erreur lors de l\'ajout du like');
      setLiked(!liked);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleShare = () => {
    navigator.share({
      title: level.title,
      text: 'Découvrez ce tutoriel intéressant !',
      url: window.location.href,
    }).catch((error) => console.log('Erreur de partage', error));
  };

  // Fonction pour télécharger la vidéo
  const handleDownload = (e) => {
    // Création d'un élément <a> temporaire pour le téléchargement
    const link = document.createElement('a');
    link.href = videoUrl;
    link.target = "_blank";
    link.download = `${level.title}.mp4`; // Nom du fichier à télécharger
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  return (
    // <Paper elevation={3} sx={{ p: 3, bgcolor: '#0F2027' }}>
    <Paper elevation={3} sx={{ p: 3, bgcolor: '#fff' }}>
      <Typography variant="h6" gutterBottom color="text.primary">
        Informations sur le tutoriel
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Niveau :</Typography>
        <Chip label={level.title} sx={{ bgcolor: '#108643', color: '#fff' }} size="small" />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Technologies :</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {technologies.map((tech) => (
            <Chip key={tech.title} label={tech.title} sx={{ bgcolor: '#264653', color: '#fff' }} size="small" />
          ))}
        </Box>
      </Box>
      <Divider sx={{ my: 2, bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          src={author.photo ? `${process.env.REACT_APP_API_URL}/${author.photo.src}` : undefined}
          sx={{ mr: 2 }}
        >
          {author.firstname[0]}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">Auteur :</Typography>
          <Typography variant="body2" color="text.primary">
            {`${author.firstname} ${author.lastname}`}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        startIcon={<GetAppIcon />}
        fullWidth
        onClick={handleDownload}
        sx={{ 
          bgcolor: '#108643', 
          color: '#fff', 
          '&:hover': { bgcolor: 'rgb(0, 230, 142)' } 
        }}
      >
        Télécharger la vidéo
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, bgcolor: "#555" }}>
        <IconButton onClick={handleLike} sx={{ color: liked ? '#108643' : '#fff' }}>
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={handleShare} sx={{ color: '#fff' }}>
          <ShareIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}