import { Box, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import "./Strategy.css"

const Strategy = ({children,title,src}) => {
  return (
    <Stack direction={'column'} className="strategy" sx={{overflow:'hidden', textAlign:"center"}} flexGrow={1}>
        <Box className="image">
            <img src={src} alt="representation" />
        </Box>
        <Typography variant="h6" sx={{color:"#271033"}}>{title}</Typography>
        <p>{children}</p>
    </Stack>
  )
}

export default Strategy