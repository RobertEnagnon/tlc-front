import { Box, Divider, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import "./Tcomment.css";
import profile from "../../assets/images/noavatar.jpg";

function Tcomment({ comment }) {
   
    return (
        <Box>
            <Typography>
                {comment?.author?.photo ?
                    <img className="commentImg" src={process.env.REACT_APP_API_URL + "/" + comment.author.photo.src} /> :
                    <img className="commentImg" src={profile} />
                }
                <span className="authorName">{comment?.author.firstname + " " + comment?.author.lastname}</span>
            </Typography>
            <Box className="tcommentContent" >{comment?.content} <br /></Box>
            {/* Bordure séparatrice */}
            <Divider sx={{ my: 1, width: '50%', borderStyle: 'dashed' }} />
        </Box>
    )
}

export default Tcomment