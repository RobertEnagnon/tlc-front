import { Box, Button, Stack, Typography } from '@mui/material'
import './HomeFooter.css'
import { Link } from 'react-router-dom'
import { Facebook,LinkedIn,Instagram,YouTube,Twitter,  } from '@mui/icons-material'
import AppStore32 from '../../assets/images/app-store32.png';
import GoogleStore32 from '../../assets/images/google-play32.png';



const HomeFooter = () => {
  return (
    <Box className="homeFooter">
        <Stack direction={{lg:'row',md:'row',sm:'column',xs:'column'}} sx={{justifyContent:'center', alignItems:'center'}}>
            <Box className="left">
                <Typography variant='h4'>
                    Vouloir démarrer le Codage ?
                </Typography>
                <Button className='btnLearn'>Apprendre maintenant</Button>
            </Box>
            <Box className="right">
                <Stack className='footerLinks' direction={'column'} gap={2} useFlexGap flexWrap="wrap" justifyContent={'flex-start'} alignItems={'flex-start'}>
                    <Link className='footerLink' to={'#'}>Blog</Link>
                    <Link className='footerLink' to={'#'}>Nos Projets</Link>
                    <Link className='footerLink' to={'#'}>Communauté Discord</Link>
                    <Link className='footerLink' to={'#'}>Qui sommes-nous</Link>
                    <Link className='footerLink' to={'#'}>Bésoin d'aide</Link>
                    <Link className='footerLink' to={'#'}>Conditions générales d'utilisation</Link>
                    <Link className='footerLink' to={'#'}>Politique de protection des données personnelles</Link>
                    <Link className='footerLink' to={'#'}>Expérience de formation</Link>
                    <Box className='footerLink' to={'#'}>
                        <Typography variant='h6'>Télécharger gratuitement</Typography>
                        <Box className="storeLinks">
                            <Link className='storeLink' to={'#'} ><img src={GoogleStore32} alt='notre appli sur android'/></Link>
                            <Link className='storeLink' to={'#'} ><img src={AppStore32} alt='notre appli sur ios'/></Link>
                        </Box>
                        <Typography variant='h6'>Réjoignez-nous</Typography>
                        <Box className="socials">
                            <Link className='socialLink' to={'#'}><YouTube className='social'/></Link>
                            <Link className='socialLink' to={'#'}><Facebook className='social'/></Link>
                            <Link className='socialLink' to={'#'}><LinkedIn className='social'/></Link>
                            <Link className='socialLink' to={'#'}><Instagram className='social'/></Link>
                            <Link className='socialLink' to={'#'}><Twitter className='social'/></Link>
                        </Box>

                    </Box>
                </Stack>
            </Box>
        </Stack>
    </Box>
  )
}

export default HomeFooter