import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardMedia, Typography, Grid2, TextField, MenuItem, Button, createTheme, ThemeProvider } from '@mui/material';
import { readDocuments } from '../services/database'; 
import { auth } from '../utils/firebase-config';
import { createFriendRequest } from '../services/database';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffeb3b', // Yellow
    },
    background: {
      default: '#0d1b2a', // Dark blue
      paper: '#1b263b', // Lighter dark blue for contrast
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#d9d9d9', // Grey text for secondary info
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const Users = () => {
    const [filters, setFilters] = useState({
      game: '',
      interest: '',
      skillLevel: '',
    });
    const [player, setPlayers] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await readDocuments('users'); 
        setPlayers(data);
      };
      
      fetchData();
    }, []);

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const filteredPlayers = player.filter(player => 
    (!filters.game || player.games.includes(filters.game)) &&
    (!filters.interest || player.interests.includes(filters.interest)) &&
    (!filters.skillLevel || player.preferences.skillLevel === filters.skillLevel)
  );
  const handleConnect = async (playerId) => {
    const currentUserId = auth.currentUser.uid;
    const requestData = {
      senderId: currentUserId,
      receiverId: playerId,
      status: 'pending',
    };
    await createFriendRequest(requestData);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px', backgroundColor: theme.palette.background.default, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: '1200px', width: '100%', padding: '20px' }}>
          <Typography variant="h4" gutterBottom color="primary">Find Teammates</Typography>
          
          <Grid2 container spacing={2} style={{ marginBottom: '20px' }}>
            <Grid2 item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                name="game"
                label="Game"
                value={filters.game}
                onChange={handleFilterChange}
                variant="outlined"
                color="primary"
                sx={{ 
                  minWidth: '150px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ffeb3b', // Yellow border
                    },
                    '&:hover fieldset': {
                      borderColor: '#ffeb3b', // Yellow border on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ffeb3b', // Yellow border when focused
                    },
                  }
                }}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="Valorant">Valorant</MenuItem>
                <MenuItem value="Roblox">Roblox</MenuItem>
                <MenuItem value="Fortnite">Fortnite</MenuItem>
                <MenuItem value="Minecraft">Minecraft</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                name="interest"
                label="Interest"
                value={filters.interest}
                onChange={handleFilterChange}
                variant="outlined"
                color="primary"
                sx={{ 
                  minWidth: '150px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ffeb3b', // Yellow border
                    },
                    '&:hover fieldset': {
                      borderColor: '#ffeb3b', // Yellow border on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ffeb3b', // Yellow border when focused
                    },
                  }
                }}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="Strategy">Strategy</MenuItem>
                <MenuItem value="FPS">FPS</MenuItem>
                <MenuItem value="Building">Building</MenuItem>
                <MenuItem value="Battle Royale">Battle Royale</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                name="skillLevel"
                label="Skill Level"
                value={filters.skillLevel}
                onChange={handleFilterChange}
                variant="outlined"
                color="primary"
                sx={{ 
                  minWidth: '150px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ffeb3b', // Yellow border
                    },
                    '&:hover fieldset': {
                      borderColor: '#ffeb3b', // Yellow border on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ffeb3b', // Yellow border when focused
                    },
                  }
                }}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={3}>
            {filteredPlayers.map((player) => (
              <Grid2 item xs={12} sm={6} md={4} key={player.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.paper, borderRadius: 0, minHeight: '400px', minWidth: '250px' }}>
                    <CardMedia
                      component="img"
                      image={player.profileImage?player.profileImage:'https://placehold.co/150'}
                      alt={player.username}
                      style={{ maxHeight: '200px', objectFit: 'cover' }}
                    />
                    <CardContent style={{ flexGrow: 1 }}>
                      <Typography variant="h6" color="text.primary">{player.username}</Typography>
                      <Typography variant="body2" color="text.secondary">{player.bio}</Typography>
                      <Typography variant="body2" color="text.secondary">Games: {player.games.join(', ')}</Typography>
                      <Typography variant="body2" color="text.secondary">Interests: {player.interests.join(', ')}</Typography>
                      <Typography variant="body2" color="text.secondary">Location: {player.location}</Typography>
                      <Typography variant="body2" color="text.secondary">Skill Level: {player.preferences.skillLevel}</Typography>
                    </CardContent>
                    <Button variant="contained" color="primary" style={{ borderRadius: 0 }} onClick={() => handleConnect(player.uid)}>
                      Connect
                    </Button>
                  </Card>
                </motion.div>
              </Grid2>
            ))}
          </Grid2>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Users;
