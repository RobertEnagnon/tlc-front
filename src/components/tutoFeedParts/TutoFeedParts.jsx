import { TabPanel } from '@mui/lab'
import { Box, Button, Stack } from '@mui/material'
import './TutofeedParts.css'
import { Link } from 'react-router-dom'


const TutoFeedParts = ({description, image, value}) => {
  return (
    <>
        <TabPanel value={`${value}`}>
            <Stack direction={{lg:'row', md:'row', sm:'column', xs:'column'}} gap={2} className='tutoFeedPart'>
                <Box>
                    <span className='description'>{description}</span> <br />
                    <Link to={"/premium"} color="inherit">
                        <Button variant="contained" className="btnFirst"  sx={{
                                    padding:{md:"15px 60px"},margin: "20px 0"
                                }} >
                            Accès Immédiat et Gratuit
                        </Button>
                    </Link >
                </Box>
                <Box>
                <div className="image">
                    <img src={image} alt="representation" />
                </div>
                </Box>
            </Stack>
        </TabPanel>
    </>
  )
}

export default TutoFeedParts