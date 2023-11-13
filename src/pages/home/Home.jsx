import React from 'react'
import  './Home.css'
import Banner from '../../components/banner/Banner'
import Feed from '../../components/feed/Feed'
import QuickPremium from '../../components/quickPremium/QuickPremium'
import TutorielFeed from '../../components/tutorielFeed/TutorielFeed'
import { Box } from '@mui/material'
const Home = () => {
  return (
    <Box className='home mainBg'>
        <Banner/>
        <Feed/>
        <QuickPremium/>
        <TutorielFeed/>  
    </Box>
  )
}

export default Home