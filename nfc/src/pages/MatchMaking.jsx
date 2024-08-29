import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Button, Typography, Card, CardContent, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { motion } from 'framer-motion';
import ChatAndVoice from '../components/ChatAndVoice';

const games = ['Valorant', 'CS:GO', 'Dota 2']; // Example games
const genres = ['FPS', 'MOBA', 'RPG']; // Example genres

const MatchMaking = ({ userId, username }) => {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:3001'); // Replace with your server URL
    setSocket(newSocket);

    newSocket.on('match found', ({ roomId }) => {
      setRoomId(roomId);
      setIsSearching(false);
    });

    return () => newSocket.disconnect();
  }, []);

  const findMatch = () => {
    setIsSearching(true);
    socket.emit('find match', { userId, username, game: selectedGame, genre: selectedGenre });
  };

  if (roomId) {
    return <ChatAndVoice roomId={roomId} userId={userId} username={username} />;
  }

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 400, mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Find a Match
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Game</InputLabel>
            <Select
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              label="Game"
            >
              {games.map((game) => (
                <MenuItem key={game} value={game}>
                  {game}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Genre</InputLabel>
            <Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              label="Genre"
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isSearching ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isSearching && <Typography>Looking for a match...</Typography>}
          </motion.div>
          <Button
            variant="contained"
            onClick={findMatch}
            disabled={isSearching}
            fullWidth
            sx={{ mt: 2 }}
          >
            {isSearching ? 'Searching...' : 'Find Match'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchMaking;
