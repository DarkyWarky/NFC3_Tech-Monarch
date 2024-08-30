import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { 
  Button, Typography, Card, CardContent, MenuItem, Select, FormControl, 
  InputLabel, TextField, Box, Chip, Avatar, List, ListItem, ListItemAvatar, 
  ListItemText, Dialog, DialogTitle, DialogContent, DialogActions,
  CssBaseline, ThemeProvider, createTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import ChatAndVoice from '../components/ChatAndVoice';

const games = ['Valorant', 'CS:GO', 'Dota 2', 'League of Legends', 'Overwatch'];
const genres = ['Room-1', 'Room-2', 'Room-3', 'Room-4', 'Room-5'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFC107',
    },
    background: {
      default: '#00008B',
      paper: '#283593',
    },
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const MatchMaking = () => {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [customGame, setCustomGame] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [showUsernameDialog, setShowUsernameDialog] = useState(true);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('match found', ({ roomId, users }) => {
      setRoomId(roomId);
      setIsSearching(false);
      setCurrentUsers(users || []);
    });

    newSocket.on('user joined', ({ user }) => {
      setCurrentUsers((prevUsers) => [...prevUsers, user]);
    });

    newSocket.on('user left', ({ userId }) => {
      setCurrentUsers((prevUsers) => prevUsers.filter(user => user.userId !== userId));
    });

    newSocket.on('chat message', (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.disconnect();
  }, []);

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      setUserId(Date.now().toString());
      setShowUsernameDialog(false);
    }
  };

  const findMatch = () => {
    if (socket) {
      setIsSearching(true);
      const gameToSearch = selectedGame === 'Custom' ? customGame : selectedGame;
      socket.emit('find match', { userId, username, game: gameToSearch, genre: selectedGenre });
    }
  };

  const handleJoinRoom = () => {
    if (socket && joinRoomId) {
      socket.emit('join room', { roomId: joinRoomId, userId, username });
      setRoomId(joinRoomId);
      setOpenJoinDialog(false);
    }
  };

  const leaveRoom = () => {
    if (socket && roomId) {
      socket.emit('leave room', { roomId, userId });
      setRoomId(null);
      setCurrentUsers([]);
      setChatMessages([]);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', overflow: 'auto', padding: 2 }}>
        <Dialog open={showUsernameDialog} onClose={() => {}}>
          <DialogTitle>Enter Your Username</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUsernameSubmit} disabled={!username.trim()}>
              Start
            </Button>
          </DialogActions>
        </Dialog>

        {!showUsernameDialog && (
          roomId ? (
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Game Room: {roomId}
                </Typography>
                <Typography variant="subtitle1">
                  Current Game: {selectedGame === 'Custom' ? customGame : selectedGame}
                </Typography>
                <Box sx={{ mt: 2, mb: 2 }}>
                  <Typography variant="h6">Players:</Typography>
                  <List>
                    {currentUsers.map((user) => (
                      <ListItem key={user.userId}>
                        <ListItemAvatar>
                          <Avatar>{user.username ? user.username[0] : '?'}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.username} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                {socket && (
                  <ChatAndVoice 
                    roomId={roomId} 
                    userId={userId} 
                    username={username}
                    socket={socket}
                    messages={chatMessages}
                    setMessages={setChatMessages}
                  />
                )}
                <StyledButton variant="contained" color="secondary" onClick={leaveRoom}>
                  Leave Room
                </StyledButton>
              </CardContent>
            </StyledCard>
          ) : (
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom>
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
                    <MenuItem value="Custom">Custom</MenuItem>
                  </Select>
                </FormControl>
                {selectedGame === 'Custom' && (
                  <TextField
                    fullWidth
                    label="Custom Game"
                    value={customGame}
                    onChange={(e) => setCustomGame(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                )}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Rooms</InputLabel>
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
                  {isSearching && (
                    <Chip 
                      label="Looking for a match..." 
                      color="primary" 
                      sx={{ mb: 2 }}
                    />
                  )}
                </motion.div>
                <StyledButton
                  variant="contained"
                  onClick={findMatch}
                  disabled={isSearching || (!selectedGame && !customGame) || !selectedGenre}
                  fullWidth
                >
                  {isSearching ? 'Searching...' : 'Find Match'}
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  onClick={() => setOpenJoinDialog(true)}
                  fullWidth
                >
                  Join Existing Room
                </StyledButton>
              </CardContent>
            </StyledCard>
          )
        )}

        <Dialog open={openJoinDialog} onClose={() => setOpenJoinDialog(false)}>
          <DialogTitle>Join Existing Room</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Room ID"
              fullWidth
              variant="outlined"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenJoinDialog(false)}>Cancel</Button>
            <Button onClick={handleJoinRoom} disabled={!joinRoomId}>Join</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default MatchMaking;