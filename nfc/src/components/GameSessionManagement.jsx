// src/GameSessionManagement.js

import React, { useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import dummyGameSessions from '../services/dummyData';

const GameSessionManagement = () => {
  const [sessions, setSessions] = useState(dummyGameSessions);
  const [newSession, setNewSession] = useState({
    gameTitle: '',
    sessionDate: '',
    duration: '',
    players: [],
    status: 'Ongoing'
  });
  const [newPlayer, setNewPlayer] = useState({ username: '', rank: '' });

  const handleAddSession = () => {
    setSessions([...sessions, { ...newSession, id: (sessions.length + 1).toString(), players: [...newSession.players] }]);
    setNewSession({ gameTitle: '', sessionDate: '', duration: '', players: [], status: 'Ongoing' });
  };

  const handleAddPlayer = () => {
    setNewSession({
      ...newSession,
      players: [...newSession.players, newPlayer]
    });
    setNewPlayer({ username: '', rank: '' });
  };

  const handleDeleteSession = (id) => {
    setSessions(sessions.filter(session => session.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Game Session Management
      </Typography>
      
      <Paper style={{ padding: '16px', marginBottom: '16px' }}>
        <Typography variant="h6">Add New Session</Typography>
        <TextField
          label="Game Title"
          value={newSession.gameTitle}
          onChange={(e) => setNewSession({ ...newSession, gameTitle: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Session Date"
          type="date"
          value={newSession.sessionDate}
          onChange={(e) => setNewSession({ ...newSession, sessionDate: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Duration"
          value={newSession.duration}
          onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={newSession.status}
            onChange={(e) => setNewSession({ ...newSession, status: e.target.value })}
          >
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6" gutterBottom>
          Add Player
        </Typography>
        <TextField
          label="Username"
          value={newPlayer.username}
          onChange={(e) => setNewPlayer({ ...newPlayer, username: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rank"
          value={newPlayer.rank}
          onChange={(e) => setNewPlayer({ ...newPlayer, rank: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPlayer}
          style={{ marginTop: '16px' }}
        >
          Add Player
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddSession}
          style={{ marginTop: '16px', marginLeft: '8px' }}
        >
          Add Session
        </Button>
      </Paper>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Game Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Players</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.gameTitle}</TableCell>
                <TableCell>{session.sessionDate}</TableCell>
                <TableCell>{session.duration}</TableCell>
                <TableCell>
                  {session.players.map(player => (
                    <div key={player.username}>
                      {player.username} ({player.rank})
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <Chip label={session.status} color={session.status === 'Completed' ? 'success' : session.status === 'Ongoing' ? 'info' : 'error'} />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" style={{ marginRight: '8px' }}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteSession(session.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default GameSessionManagement;
