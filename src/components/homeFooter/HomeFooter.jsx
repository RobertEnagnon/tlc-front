import { Box, Button, Stack, Typography } from '@mui/material'
import './HomeFooter.css'
import { Link } from 'react-router-dom'
import { Facebook, LinkedIn, Instagram, YouTube, X, } from '@mui/icons-material'
import AppStore32 from '../../assets/images/app-store32.png';
import GoogleStore32 from '../../assets/images/google-play32.png';



const HomeFooter = () => {
    return (
        <Box className="homeFooter">
            <Stack direction={{ lg: 'row', md: 'row', sm: 'column', xs: 'column' }} sx={{ justifyContent: 'center', alignItems: 'center' }}>
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
                            <Typography variant='h6' color={"#fff"} >Télécharger gratuitement</Typography>
                            <Box className="storeLinks">
                                <Link className='storeLink' to={'#'} ><img src={GoogleStore32} alt='notre appli sur android' /></Link>
                                <Link className='storeLink' to={'#'} ><img src={AppStore32} alt='notre appli sur ios' /></Link>
                            </Box>
                            <Typography variant='h6' color={"#fff"} >Réjoignez-nous</Typography>
                            <Box className="socials">
                                <Link className='socialLink' target='_blank' to={'https://youtube.com/@ronasdev'}><YouTube className='social' /></Link>
                                <Link className='socialLink' target='_blank' to={'https://facebook.com/@ronasdev'}><Facebook className='social' /></Link>
                                <Link className='socialLink' target='_blank' to={'https://linkedin.com/in/robert-sodjinou'}><LinkedIn className='social' /></Link>
                                <Link className='socialLink'  target='_blank' to={'https://tiktok.com/@ronasdev1'}>
                                    <svg className='social' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"
                                        style={{fill:"#FFFFFF"}}>
                                        <path d="M 6 3 C 4.3550302 3 3 4.3550302 3 6 L 3 18 C 3 19.64497 4.3550302 21 6 21 L 18 21 C 19.64497 21 21 19.64497 21 18 L 21 6 C 21 4.3550302 19.64497 3 18 3 L 6 3 z M 12 7 L 14 7 C 14 8.005 15.471 9 16 9 L 16 11 C 15.395 11 14.668 10.734156 14 10.285156 L 14 14 C 14 15.654 12.654 17 11 17 C 9.346 17 8 15.654 8 14 C 8 12.346 9.346 11 11 11 L 11 13 C 10.448 13 10 13.449 10 14 C 10 14.551 10.448 15 11 15 C 11.552 15 12 14.551 12 14 L 12 7 z"></path>
                                    </svg>
                                </Link>
                                <Link className='socialLink' target='_blank' to={'https://instagram.com/ronasdev'}><Instagram className='social' /></Link>
                                <Link className='socialLink' target='_blank' to={'https://x.com/ronasdev'}><X className='social' /></Link>
                                {/* <Link className='socialLink' to={'https://tiktok.com/@ronasdev1'}><Tiktok className='social'/></Link> */}
                            </Box>

                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default HomeFooter