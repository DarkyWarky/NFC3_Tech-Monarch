// src/components/GamingPage.js
import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import TournamentCard from './TournamentCard';
import ForumCard from './ForumCard';
import tournamentsData from '../services/tournaments.json';

const GamingPage = () => {
  return (
    <Container sx={{ backgroundColor: '#001f3f', color: 'white', minHeight: '100vh', py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
        Community Forums & Tournaments
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Upcoming Tournaments
      </Typography>
      <Grid container spacing={4}>
        {tournamentsData.map((tournament) => (
          <Grid item xs={12} sm={6} md={4} key={tournament.id}>
            <TournamentCard tournament={tournament} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" sx={{ mt: 8, mb: 2 }}>
        Active Forums
      </Typography>
      <Grid container spacing={4}>
        {/* Example forums, replace with actual data */}
        {[...Array(4).keys()].map((i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <ForumCard forum={{ title: `Forum ${i + 1}`, description: 'Forum description here' }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GamingPage;
