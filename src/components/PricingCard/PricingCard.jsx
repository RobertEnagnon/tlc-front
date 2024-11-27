import React from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, isRecommended }) => ({
  maxWidth: 400,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
  },
  ...(isRecommended && {
    // border: `2px solid ${theme.palette.primary.main}`,
    border: `2px solid #11998e`,
    position: 'relative',
    '&::before': {
      content: '"Recommandé"',
      position: 'absolute',
      top: 0,
      right: 0,
    //   backgroundColor: theme.palette.primary.main,
      backgroundColor: "#11998e",
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(0.5, 1),
      borderBottomLeftRadius: theme.shape.borderRadius,
    },
  }),
}));

const PricingCard = ({ title, price, period, features, isRecommended }) => {
  return (
    <StyledCard isRecommended={isRecommended}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          {title}
        </Typography>
        <Typography variant="h3" component="p" gutterBottom align="center" color="#108643">
          {price}
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary">
          {period}
        </Typography>
        <List sx={{ mt: 2, mb: 2 }}>
          {features.map((feature, index) => (
            <ListItem key={index} disableGutters>
              <ListItemIcon>
                <CheckIcon  sx={{color: "#108643"}} />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
        <Button
        className='btnFirst'
          variant="contained"
        //   color="#"

          size="large"
          fullWidth
          sx={{ mt: 'auto', }}
        >
          Devenir Premium
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default PricingCard;