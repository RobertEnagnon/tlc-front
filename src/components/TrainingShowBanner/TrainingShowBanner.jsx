import React from 'react'
import "./TrainingShowBanner.css";

import BannerImage from '../../assets/images/bannerTra.jpeg';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TrainingShowBanner = ({ title, banner, description }) => {
  console.log(`${process.env.REACT_APP_API_URL}/${banner}`);
  return (
    <Box
      sx={{
        backgroundImage: `url(${BannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 400,
        // display: 'flex',
        // alignItems: 'center',
        // // justifyContent: 'center',
        position: 'relative'
      }}
    >
      <Typography variant="h6" color="#c5c5c5" align="left" pt={4} pl={4} fontStyle={'italic'} fontSize={12}>
        {` Formation > ${title}`}
      </Typography>
      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <Box color={'#fff'} m={10} p={10} fontSize={24}  >
          {description}
          <br />
          <Link to={"/"} color="inherit">
            <Button variant="contained" className="btnFirst" sx={{
              padding: { md: "10px 40px" }, margin: "20px 0"
            }} >
              Demarrer
            </Button>
          </Link >
        </Box>
        <Box style={{ width: 250, height: 150, marginRight: 50, border: "solid 2px white" }}>
          <img style={{ width: "100%", height: "100%", objectFit: "cover", }} src={`${process.env.REACT_APP_API_URL}/${banner}`} alt='mini baniière de la formation' />
        </Box>
      </Box>
    </Box>
  )
}

export default TrainingShowBanner