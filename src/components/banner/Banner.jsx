import { Box, Button, Stack, Typography, styled } from "@mui/material"
import "./Banner.css";
import { Link } from "react-router-dom";


const TutoButton = styled(Button)({
    backgroundColor: 'transparent',
    borderColor: '#0F2027',
    color: '#0F2027',
    fontSize: "20px",
    padding:"15px 20px",
    whiteSpace:'nowrap',
    transition:"ease-in all 0.3s",
    '&:hover':{
        borderColor: '#f9f9f9',
        color:"#f9f9f9",
        letterSpacing: "1px",
        transition:"ease-in all 0.3s"
    },
    '@media all and (max-width:960px)':{
        fontSize: '16px',
        padding: '10px 20px ',
        marginTop:'0px'
    }
})

const Banner = () => {

    
  return (
    <Box
        className='banner'
        sx={{
            width:"100%",
            minHeight:"78vh",
            display:"flex",
            justifyContent:'center',
            alignItems:"center",
            overflow: "hidden",
            marginTop: "70px"
        }}
    >
        
        <Stack className="wrapper" direction={{md:'column',lg:'row',}} 
            sx={{display:"flex",justifyContent:{lg:"space-between",md:"center", sm:'center',xs:'center'},
             alignItems:{lg:'center',md:'center',sm:'center',xs:'center'},width:{lg:"80%", md:'100%'}, minHeight:'78vh'}}>
            <Box width={{lg:'65%',md:'80%',sm:'90%',xs:'90%'}} sx={{margin: "auto"}} className="left"  >
                <Typography color={"white"} variant="h3" className="title">
                    <span className="ronasdev">The Legend Code</span> <br />
                    Une source inépuisable de savoir à déguster sans modération
                </Typography>
                <p className="principal">
                "Découvrez la voie vers un avenir numérique prometteur grâce à nos stratégies d'explication de pointe dans nos formations variées et
                 notre coaching pratique, taillé sur mesure pour votre réussite."
                </p>
                <Stack direction={{md:'row',sm:'column'}} gap={2}>
                    <Link to={"/formations"} color="inherit">
                        <Button variant="contained" className="btnFirst"  sx={{
                                    padding:{md:"15px 60px"},margin: "20px 0"
                                }} >
                            Découvrir les formations
                        </Button>
                    </Link >
                    <Link to={'/tutoriels'} color="inherit">
                        <TutoButton variant="outlined" 
                            sx={{
                                padding:{md:"15px 60px"},margin: "20px 0 20px 20px"
                            }}
                        >Voir les tutoriels</TutoButton>
                    </Link>
                </Stack>
            </Box>
            
            <Box className="right" sx={{display:{sm:'none', md:'flex'}}}>
        
            </Box>
        </Stack>
    </Box>
  )
}

export default Banner