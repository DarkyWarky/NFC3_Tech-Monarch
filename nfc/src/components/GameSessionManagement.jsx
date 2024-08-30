// src/GameSessionManagement.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button, TextField, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';

const GameSessionManagement = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    gameTitle: '',
    sessionDate: '',
    duration: '',
    players: [],
    status: ''
  });
  const [newPlayer, setNewPlayer] = useState({ username: '', rank: '' });

  useEffect(() => {
    const interval = setInterval(() => {
      setSessions(prevSessions =>
        prevSessions.map(session => {
          if (session.status === 'Ongoing' && session.endTime) {
            const timeRemaining = session.endTime - Date.now();
            if (timeRemaining <= 0) {
              return { ...session, status: 'Completed' };
            }
            return { ...session, timeRemaining };
          }
          return session;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAddSession = () => {
    const endTime = newSession.sessionDate ? new Date(new Date().getTime() + parseInt(newSession.duration) * 60000) : null;
    setSessions([...sessions, {
      ...newSession,
      id: (sessions.length + 1).toString(),
      players: [...newSession.players],
      status: endTime ? 'Ongoing' : 'Completed',
      endTime,
      timeRemaining: endTime ? endTime - Date.now() : 0
    }]);
    setNewSession({ gameTitle: '', sessionDate: '', duration: '', players: [], status: '' });
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
    <Container style={{
      backgroundImage: `url("https://i.pinimg.com/originals/9d/06/ba/9d06ba9b3649ad3e0097d4becf69ab98.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '0'
    }}>
      <Paper style={{
        padding: '16px',
        marginBottom: '24px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: '#FFFFFF',
        maxWidth: '500px',
        margin: '0 auto',
        border: '2px solid #FFFFFF', // White border for container
      }}>
        <Typography variant="h4" gutterBottom align="center" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
          Game Session Management
        </Typography>

        <Typography variant="h6" gutterBottom align="center" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
          Add New Session
        </Typography>
        <Grid container spacing={2} style={{
          border: '2px solid #FFFFFF',
          borderRadius: '8px',
          padding: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Game Title"
              value={newSession.gameTitle}
              onChange={(e) => setNewSession({ ...newSession, gameTitle: e.target.value })}
              fullWidth
              margin="normal"
              InputProps={{ style: { color: '#FFFFFF', fontWeight: 'bold' } }} // White and bold text
              InputLabelProps={{ style: { color: '#FFFFFF', fontWeight: 'bold' } }} // White and bold label
              style={{ marginBottom: '8px', border: '1px solid #FFFFFF' }} // White border for input
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Session Date"
              type="date"
              value={newSession.sessionDate}
              onChange={(e) => setNewSession({ ...newSession, sessionDate: e.target.value })}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true, style: { color: '#FFFFFF', fontWeight: 'bold' } }} // White and bold label
              InputProps={{ style: { color: '#FFFFFF', fontWeight: 'bold' } }} // White and bold text
              style={{ marginBottom: '8px', border: '1px solid #FFFFFF' }} // White border for input
            />
          </Grid>
        </Grid>
        <TextField
          label="Duration (minutes)"
          type="number"
          value={newSession.duration}
          onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
          fullWidth
          margin="normal"
          InputProps={{ style: { color: '#FFFFFF', fontWeight: 'bold' } }} // White and bold text
          InputLabelProps={{ style: { color: '#FFFFFF', fontWeight: 'bold' } }} // White and bold label
          style={{ marginBottom: '8px', border: '1px solid #FFFFFF' }} // White border for input
        />
        <FormControl fullWidth margin="normal" style={{ marginBottom: '16px', border: '1px solid #FFFFFF' }}>
          <InputLabel style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Status</InputLabel>
          <Select
            value={newSession.status}
            onChange={(e) => setNewSession({ ...newSession, status: e.target.value })}
            style={{ color: '#FFFFFF', fontWeight: 'bold' }} // White and bold text
          >
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="To be Held">To be Held</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6" gutterBottom align="center" style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
          Add Player
        </Typography>
        <TextField
          label="Username"
          value={newPlayer.username}
          onChange={(e) => setNewPlayer({ ...newPlayer, username: e.target.value })}
          fullWidth
          margin="normal"
          InputProps={{ style: { color: '#FFFFFF', fontWeight: 'bold' } }} // White and bold text
          InputLabelProps={{ style: { color: '#FFFFFF', fontWeight: 'bold' } }} // White and bold label
          style={{ marginBottom: '8px', border: '1px solid #FFFFFF' }} // White border for input
        />
        <TextField
          label="Rank"
          value={newPlayer.rank}
          onChange={(e) => setNewPlayer({ ...newPlayer, rank: e.target.value })}
          fullWidth
          margin="normal"
          InputProps={{ style: { color: '#FFFFFF', fontWeight: 'bold' } }} // White and bold text
          InputLabelProps={{ style: { color: '#FFFFFF', fontWeight: 'bold' } }} // White and bold label
          style={{ marginBottom: '8px', border: '1px solid #FFFFFF' }} // White border for input
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

      <TableContainer component={Paper} style={{
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
        background: 'rgba(0, 0, 0, 0.7)',
        color: '#FFFFFF',
        padding: '16px',
        borderRadius: '8px',
        border: '2px solid #FFFFFF', // White border for table container
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Game Title</TableCell>
              <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Date</TableCell>
              <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Duration</TableCell>
              <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Players</TableCell>
              <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Status</TableCell>
              <TableCell style={{ color: '#FFFFFF', fontWeight: 'bold', border: '1px solid #FFFFFF' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id} style={{ '&:hover': { backgroundColor: '#333' } }}>
                <TableCell style={{ border: '1px solid #FFFFFF', color: '#FFFFFF', fontWeight: 'bold' }}>{session.gameTitle}</TableCell>
                <TableCell style={{ border: '1px solid #FFFFFF', color: '#FFFFFF', fontWeight: 'bold' }}>{session.sessionDate}</TableCell>
                <TableCell style={{ border: '1px solid #FFFFFF', color: '#FFFFFF', fontWeight: 'bold' }}>{session.duration} minutes</TableCell>
                <TableCell style={{ border: '1px solid #FFFFFF', color: '#FFFFFF', fontWeight: 'bold' }}>
                  {session.players.map(player => (
                    <div key={player.username}>
                      {player.username} ({player.rank})
                    </div>
                  ))}
                </TableCell>
                <TableCell style={{ border: '1px solid #FFFFFF', color: '#FFFFFF', fontWeight: 'bold' }}>
                  <Chip label={session.status} color={
                    session.status === 'Completed' ? 'success' :
                    session.status === 'Ongoing' ? 'info' :
                    session.status === 'To be Held' ? 'default' : 'error'
                  } />
                  {session.status === 'Ongoing' && session.timeRemaining > 0 && (
                    <div style={{ marginTop: '8px' }}>
                      Time Remaining: {Math.ceil(session.timeRemaining / 60000)} minutes
                    </div>
                  )}
                </TableCell>
                <TableCell style={{ border: '1px solid #FFFFFF' }}>
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