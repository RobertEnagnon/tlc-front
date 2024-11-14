import React, { useEffect, useState } from 'react';
import "./TrainingShow.css"
import { Box, Button, Container, Typography } from '@mui/material';
import TrainingShowBanner from '../../components/TrainingShowBanner/TrainingShowBanner';
import { Link, useParams } from 'react-router-dom';

import { OndemandVideo as OndemandVideoIcon, Pause as PauseIcon, FiberManualRecord as FiberManualRecordIcon} from '@mui/icons-material';

function TrainingShow() {
  const [training, setTraining] = useState(null);
  const [startLearning, setStartLearning] = useState(false);


  const { id } = useParams();

  useEffect(() => {
    const fetchTraining = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trainings/${id}`, {
        headers: {
          'content-type': "application/json"
        }
      });

      const data = await response.json();
      setTraining(data)
    }

    fetchTraining();

  }, [id])


  return (
    <Box sx={{ flexGrow: 1, mt: '70px' }} className="trainingList mainBg"
    >
      <TrainingShowBanner title={training?.title} banner={training?.banner} description={training?.description} />
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: "flex-start", marginTop: 30 }}>
        <Box className="trainingContent">
          <Typography variant='h5'>Contenu de la formation</Typography>
          <Box>
            <Typography className='chapterTitre'>10 chapitre. 77 sections. Durée totale: 20h5min</Typography>
            <Box className="chapterContainer">
              {training?.chapters?.map((chapter) => {
                return (
                  <Box key={chapter.id} className="chapter">
                    <Typography variant='h6' mb={2} >{chapter?.title} <span style={{ float: 'right' }}>{chapter?.duration}</span></Typography>
                    {chapter?.sections.map(section => {
                      return (

                        <Typography key={section.id} className='sectionItem'>
                          {startLearning ?
                            <PauseIcon className='sectionItemPauseIcon' />
                            :
                            <OndemandVideoIcon className='sectionItemPlayIcon' />
                          }
                          <span>{section?.title}</span>
                          <span className='sectionItemDuration'>{section?.duration}</span>
                        </Typography>
                      )
                    })}
                  </Box>
                )
              })}

            </Box>
          </Box>
        </Box>
        <Box className="presentation">
          <Typography variant='h5' >Presentation</Typography>
          <Box className="presentationVideoContainer">
            {training?.presentationVideo && <video controls>
              <source src={`${process.env.REACT_APP_API_URL}/${training?.presentationVideo}`} type="video/mp4" />
            </video>}
          </Box>

          <Box className="p" style={{ textAlign: "justify" }} mt={2}>
            {training?.details}
          </Box>
          <Box mt={2} display={"flex"} justifyContent={"space-between"} alignItems={'center'}>
            <Box className="resource">
              <Typography className='h6'>Liens utiles</Typography>
              <Box display={'flex'} alignItems={'center'}>
                <FiberManualRecordIcon  fontSize='xsmall' sx={{mr:1}} />
                  Documentation
              </Box>
            </Box>
            <Box className="resource">
              <Typography className='h6'>Prérequis</Typography>
              <Box display={'flex'} alignItems={'center'}>
                <FiberManualRecordIcon  fontSize='xsmall' sx={{mr:1}} />
                  Documentation
              </Box>
              <Box display={'flex'} alignItems={'center'}>
                <FiberManualRecordIcon  fontSize='xsmall' sx={{mr:1}} />
                 infodj
              </Box>
            </Box>
            <Box className="resource">
              <Typography className='h6'>Informations</Typography>
              <Box display={'flex'} alignItems={'center'}>
                <FiberManualRecordIcon  fontSize='xsmall' sx={{mr:1}} />
                Nombre du projets : {training?.projectsNumber}
              </Box>
              <Box display={'flex'} alignItems={'center'}>
                <FiberManualRecordIcon  fontSize='xsmall' sx={{mr:1}} />
                  Documentation
              </Box>
            </Box>
          </Box>

          
        <Link to={"/"} color="inherit">
          <Button variant="contained" className="btnFirst" sx={{
            padding: { md: "10px 40px" }, margin: "20px 0"
          }} >
            Demarrer
          </Button>
        </Link >
        </Box>
      </Container>
    </Box>
  )
}

export default TrainingShow