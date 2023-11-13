import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Strategy from "../Strategy/Strategy";
import "./Feed.css";
import TailorMade  from '../../assets/images/tailor-made-software.png';
import Mentoring  from '../../assets/images/mentoring.png';
import Community  from '../../assets/images/Community_re.png';

const Feed = () => {
  return (
    <Stack direction={'column'} gap={1} className="feed">
        <Box className="top">
            <Typography className="title" variant="h4" sx={{textAlign:"center"}}>
                <span>Devenir programmeur grâce à</span>  <br />
                <span>notre soutien et notre suivi </span>
            </Typography>
            <Box className="paragraph">
                Venez explorez l'art de la programmation avec nos formations en développement informatique,
                oû chaque cours est soigneusement conçu pour vous guider vers l'excellence technique et vous aider à 
                atteindre vos objectifs professionnels les plus ambitieux.
            </Box>
        </Box>
        <Stack direction={{md:"row"}} gap={1} className="bottom" sx={{maxWidth:"80%"}}  mt={5}>
            <Strategy src={TailorMade} title="Une formation pratique taillée sur mesure" >
                Plongez dans un monde d'apprentissage enrichissant, où chaque leçon est conçue 
                pour vous propulser vers l'excellence.Votre succès commence ici
            </Strategy>
            <Strategy src={Mentoring} title="Un coaching hebdomadaire personnalisé" >
                Découvrez l'exclusivité d'un accompagnement hebdomadaire personnalisé pour atteindre 
                vos objectifs les plus ambitieux. Rejoignez-nous dès aujourd'hui !
            </Strategy>
            <Strategy src={Community} title="Une communauté d'entraide active" >
                Rejoignez notre communauté d'entraide dynamique et bienveillante, où l'apprentissage 
                et le partage sont au cœur de chaque interaction.
            </Strategy>
        </Stack>
    </Stack>
  )
}

export default Feed