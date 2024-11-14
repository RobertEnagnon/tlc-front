import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import { styled } from "@mui/material/styles";
import { Send as SendIcon } from '@mui/icons-material';

const BoxContent = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('xl')]: {
        width: "50%",
    },
    [theme.breakpoints.down('lg')]: {
        width: "50%",
    },
    [theme.breakpoints.down('md')]: {
        width: "50%",
    },
    [theme.breakpoints.down('sm')]: {
        width: "100%",
    },
}));

function AddComment({ currentUser, tutorialId,setNewComment,pushNewComment }) {
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fonction pour poster un commentaire
    const handlePostComment = async ()=>{
        if(!content){
            console.log("Le champ du cemmentaire ne doit pas être vide");
        }else{
            setIsLoading(true)
            try {
               
                const resp = await fetch(process.env.REACT_APP_API_URL+'/tcomments/create',{
                    method: 'POST',
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify({authorId:currentUser.id,tutorialId,content})
                });
    
                const data = await resp?.json();
                setNewComment({author:currentUser, ...data});
                setContent("")
                pushNewComment();
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }

        }
        
    }

   
    return (
        <Box>
            {!currentUser ?
                <Box color={'darkcyan'} ml={7} mb={2}>
                    Vueillez vous connecter pour ajouter un commentaire
                </Box>
                :
                <BoxContent mb={2} display={'flex'} alignItems={'baseline'} sx={{width:{md:'50%', sm:"100%"}}} >
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id="standard-textarea"
                        variant='standard'
                        multiline
                        label="Ajouter un commentaire"
                        name="content"
                        onChange={(e) => setContent(e.target.value)}

                        autoComplete={false}
                        value={content}
                    />
                    <SendIcon onClick={handlePostComment} sx={{cursor: 'pointer', color: "#acacac", "&:hover":{
                        color:'#2aa55f',
                        }}} />
                </BoxContent>
            }
        </Box>
    )
}

export default AddComment