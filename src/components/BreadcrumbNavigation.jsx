import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BreadcrumbNavigation({ title }) {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link to="/">Accueil</Link>
      <Link to="/tutoriels">Tutoriels</Link>
      <Typography color="text.primary">{title}</Typography>
    </Breadcrumbs>
  );
}