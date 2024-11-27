
import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const TrainingShowBanner = ({ title, banner, description }) => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to left, #38ef7d, #11998e)',
        minHeight: { xs: 300, md: 400 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        color: '#fff',
        padding: { xs: 2, md: 4 },
        mt: 8,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="overline" color="rgba(255,255,255,0.8)" fontSize={12} mb={1}>
          Formation
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ maxWidth: { xs: '100%', md: '60%' }, mb: { xs: 2, md: 0 } }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: 16, md: 18 }, mb: 3, textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>
              {description}
            </Typography>
            <Button
              component={Link}
              to="#content"
              variant="contained"
              className="btnFirst"
              sx={{
                fontSize: '18px',
                fontFamily: 'Raleway, sans-serif',
                padding: { xs: "10px 20px", md: "12px 40px" },
                transition: 'all 0.3s ease',
                // background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                '&:hover': {
                  // background: 'rgba(255,255,255,0.3)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                },
              }}
            >
              Découvrir le contenu
            </Button>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
              width: { md: 300 },
              height: { md: 200 },
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '10px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            }}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/${banner}`}
              alt="Bannière de la formation"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TrainingShowBanner;