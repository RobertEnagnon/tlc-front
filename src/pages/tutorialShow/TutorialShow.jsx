import "./TutorialShow.css"

import React, { useEffect, useState } from 'react';
import { Typography, Divider, Grid, IconButton, Button, Box, Container, Avatar, Stack } from '@mui/material';
import { Favorite as FavoriteIcon, GetApp as GetAppIcon, Share as ShareIcon } from '@mui/icons-material';

import { useParams } from "react-router-dom";

const TutorialShow = () => {
  let { id } = useParams();
  const [tutorial, setTutorial] = useState(null)

  //  const tutorial = {
  //     id: 1,
  //     title: 'Introduction à React',
  //     author: "Ronasdev",
  //     category: 'Front-end',
  //     level: 'Débutant',
  //     technologies: ["Javascript","Git","Github"],
  //     duration: '1 heure',
  //     videoUrl: 'https://www.youtube.com/watch?v=Ks6Ychi6p48&list=PLO1s7JuaMKag1xtnS98NbZ9Mr77vClsqH',
  //     downloadLink: "https://youtu.be/e2Tb_QFYfdw",
  //     codeCaptures: ['https://example.com/capture1.png', 'https://example.com/capture2.png'],
  //     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti recusandae quis ex. Corrupti nemo distinctio, error eligendi rem ratione molestiae iusto similique, architecto esse expedita vel ipsam reiciendis dolore pariatur cupiditate odio veniam! Illo quae cum ab sed dolore reprehenderit omnis ducimus repellat. Quae laborum eveniet doloribus ullam! Sit, itaque?"
  //   };
  useEffect( () => {
    async function fetchData(){
      const res = await fetch(process.env.REACT_APP_API_URL + `/tutorials/${id}`);
      const data = await res.json();
      setTutorial(data)

    }
    fetchData();
  }, [id])



  return (
    tutorial && <Box className="mainBg" sx={{mt:'20px'}}>
      <Container sx={{ pt: 10 }} >
        {/* Section du titre et de la vidéo */}
        <Typography variant="h4" gutterBottom>
          {tutorial.title}
        </Typography>
        {/* <video src={tutorial.video} controls width="100%" preload="metadata" /> */}
        <p>
          <iframe width="100%" height="615" src={tutorial.video}
            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </p>

        <Grid container justifyContent="space-between" alignItems="center" mt={2}>

          {/* Niveau du tutoriel */}
          <Button variant="text" color="warning" disableElevation>
            {tutorial.level.title}
          </Button>
          {/* Lien de téléchargement */}
          <Button LinkComponent={'a'} variant="outlined" href={tutorial.video} startIcon={<GetAppIcon />} color="success" download target="_blank">
            Télécharger
          </Button>
        </Grid>

        {/* Bordure séparatrice */}
        <Divider sx={{ my: 2 }} />

        {/* Section de description et captures du code */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Typography variant="h3" mb={2} >A propos de ce tutoriel</Typography>
            <Typography variant="body1">{tutorial.content}</Typography>
            {/* {tutorial.codeCaptures.map((capture) => (
          <img key={capture} src={capture} alt="Capture de code" style={{ width: '100%', marginTop: 10 }} />
        ))} */}
            {/* <Typography variant="body1">{tutorial.description}</Typography>*/}
          </Grid>

          {/* Side bar */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Technologies utilisées :</Typography>
            <Typography variant="body2">{tutorial.technologies.map(techno => <span>{techno.title}, </span> )}</Typography>

            <Divider sx={{ my: 2 }} />
            <Stack direction={'row'} gap={1}>
              <Avatar src={process.env.REACT_APP_API_URL+"/"+tutorial.user.photo.src} />
              <Typography variant="h6" >Auteur :
                <Typography variant="body2">{tutorial.user.firstname + ' ' + tutorial.user.lastname}</Typography>
              </Typography>
            </Stack>

            {/* Icons de partage sur les réseaux sociaux */}
            <Typography variant="h5" mt={1}>Partager</Typography>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Section de commentaires */}
        <Box>
          {/* Bordure séparatrice */}
        <Divider sx={{ my: 2 }} />

          {/* Vous pouvez ajouter ici le code pour la section de commentaires */}
          {tutorial.tcomments.map(comment => {
            return <span>{comment.content} <br /></span>
          })
          }
        </Box>
      </Container>
    </Box>
  );
};

export default TutorialShow;
