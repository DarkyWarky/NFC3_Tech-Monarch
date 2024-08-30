import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

// Create a custom theme with dark blue
const darkBlueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e3a8a', // Dark blue
    },
    background: {
      default: '#0d1b2a', // Very dark background
      paper: '#1a202c', // Slightly lighter
    },
    text: {
      primary: '#ffffff', // White text
    },
  },
});

const TrackerInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('76561198008049283'); // Default Steam ID

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      // Update the URL to use the proxy server
      const response = await axios.get(`http://localhost:3001/api/csgo`);

      setData(response.data);
    } catch (err) {
      setError('Failed to fetch data. Please check your API key and input.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Tracker Network Data
            </Typography>
            <TextField
              label="Steam ID"
              fullWidth
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={fetchData}
              style={{ marginTop: '1rem' }}
              fullWidth
            >
              Fetch Data
            </Button>

            {loading && <CircularProgress style={{ marginTop: '1rem' }} />}
            {error && (
              <Typography color="error" style={{ marginTop: '1rem' }}>
                {error}
              </Typography>
            )}

            {data && (
              <div style={{ marginTop: '1rem' }}>
                {/* Display the data from the API response */}
                <Typography variant="body1">Data successfully fetched!</Typography>
                <Typography variant="body2">
                  <strong>Player Name:</strong> {data.playerData.playerName}
                </Typography>
                <Typography variant="body2">
                  <strong>Kills:</strong> {data.playerData.stats.kills}
                </Typography>
                <Typography variant="body2">
                  <strong>Deaths:</strong> {data.playerData.stats.deaths}
                </Typography>
                <Typography variant="body2">
                  <strong>KDR:</strong> {data.playerData.stats.kdr}
                </Typography>
                <Typography variant="body2">
                  <strong>Matches Played:</strong> {data.playerData.stats.matchesPlayed}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default TrackerInfo;
