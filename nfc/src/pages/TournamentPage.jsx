import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, TextField, Divider, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { motion } from "framer-motion";
import Tournament from './Tournament';

const TournamentPage = () => {
  // Sample data with an additional tournament
  const tournaments = [
    {
      id: 1,
      name: "Summer Showdown",
      date: "2024-09-15",
      game: "Valorant",
      prizePool: "$5000",
      participants: 32,
      description: "An exciting summer tournament with a big prize pool.",
    },
    {
      id: 2,
      name: "Winter Clash",
      date: "2024-12-01",
      game: "PUBG",
      prizePool: "$3000",
      participants: 16,
      description: "A thrilling winter event featuring intense competition.",
    },
    {
      id: 3,
      name: "Spring Battle",
      date: "2024-03-10",
      game: "Apex Legends",
      prizePool: "$2000",
      participants: 24,
      description: "A competitive spring tournament with exciting matches.",
    },
  ];

  const [selectedTournament, setSelectedTournament] = useState(null);
  const [registrationName, setRegistrationName] = useState('');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [registrationTeam, setRegistrationTeam] = useState('');

  const handleViewDetails = (tournament) => {
    setSelectedTournament(tournament);
  };

  const handleCloseDetails = () => {
    setSelectedTournament(null);
    setRegistrationName('');
    setRegistrationEmail('');
    setRegistrationTeam('');
  };

  const handleRegister = () => {
    // Handle registration logic here
    console.log("Registering:", registrationName, registrationEmail, registrationTeam);
    handleCloseDetails();
  };

  return (
    <>
    <Box
      sx={{
        height: '110vh',
        width: '100vw',
        background: `linear-gradient(to bottom, #0a1d37, #5c2a9b), 
          url('https://images.unsplash.com/photo-1519660364-7f54c16c6b02?fit=crop&w=1920&h=1080')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: "#fff",
        padding: 4,
        boxSizing: 'border-box',
        fontFamily: 'Caribbean, sans-serif'
      }}
    >
      <Typography variant="h3" component="div" sx={{ color: "#ffeb3b", mb: 4, textAlign: 'center' }}>
        Tournaments & Competitions
      </Typography>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {tournaments.map(tournament => (
          <Grid item xs={12} sm={6} md={4} key={tournament.id}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }} sx={{ backgroundColor: '#0a1d37', color: '#fff' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: "#ffeb3b", mb: 2 }}>
                  {tournament.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  <strong>Date:</strong> {tournament.date}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  <strong>Game:</strong> {tournament.game}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  <strong>Prize Pool:</strong> {tournament.prizePool}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  <strong>Participants:</strong> {tournament.participants}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#ffeb3b', color: '#0a1d37' }}
                  onClick={() => handleViewDetails(tournament)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Live Updates Section */}
      <Typography variant="h4" component="div" sx={{ color: "#ffeb3b", mb: 2, textAlign: 'center' }}>
        Live Updates
      </Typography>
      <Box sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
        <Typography variant="h6" component="div" sx={{ color: "#ffeb3b", mb: 1 }}>
          Latest Matches
        </Typography>
        <Card sx={{ backgroundColor: '#0a1d37', color: '#fff', mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Match 1: Team A vs Team B - <strong>Score: 2-1</strong>
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Round 1
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: '#0a1d37', color: '#fff', mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Match 2: Team C vs Team D - <strong>Score: 3-0</strong>
            </Typography>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Round 1
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tournament Details Dialog */}
      {selectedTournament && (
        <Dialog open={!!selectedTournament} onClose={handleCloseDetails}>
          <DialogTitle sx={{ bgcolor: '#0a1d37', color: '#ffeb3b' }}>
            {selectedTournament.name}
          </DialogTitle>
          <DialogContent sx={{ bgcolor: '#1e1e1e', color: '#fff' }}>
            <Typography variant="body1"><strong>Date:</strong> {selectedTournament.date}</Typography>
            <Typography variant="body1"><strong>Game:</strong> {selectedTournament.game}</Typography>
            <Typography variant="body1"><strong>Prize Pool:</strong> {selectedTournament.prizePool}</Typography>
            <Typography variant="body1"><strong>Participants:</strong> {selectedTournament.participants}</Typography>
            <Typography variant="body1"><strong>Description:</strong> {selectedTournament.description}</Typography>
            <Divider sx={{ my: 2, borderColor: "#ffeb3b" }} />
            <Typography variant="h6" component="div" sx={{ color: "#ffeb3b", mb: 2 }}>
              Register for {selectedTournament.name}
            </Typography>
            <Box sx={{ bgcolor: '#fff', color: '#000', p: 3 }}>
              <TextField 
                label="Name" 
                variant="outlined" 
                fullWidth 
                sx={{ mb: 2 }} 
                value={registrationName}
                onChange={(e) => setRegistrationName(e.target.value)}
              />
              <TextField 
                label="Email" 
                variant="outlined" 
                fullWidth 
                sx={{ mb: 2 }} 
                value={registrationEmail}
                onChange={(e) => setRegistrationEmail(e.target.value)}
              />
              <TextField 
                label="Team Name (if applicable)" 
                variant="outlined" 
                fullWidth 
                sx={{ mb: 2 }} 
                value={registrationTeam}
                onChange={(e) => setRegistrationTeam(e.target.value)}
              />
              <Button 
                variant="contained" 
                sx={{ backgroundColor: '#ffeb3b', color: '#0a1d37' }}
                onClick={handleRegister}
              >
                Register
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Box>
    <Tournament/>
    </>
  );
};

export default TournamentPage;