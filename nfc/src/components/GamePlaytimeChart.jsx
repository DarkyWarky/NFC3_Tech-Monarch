import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Grid } from '@mui/material';

const gameData = [
  { name: 'Valorant', date: '2023-01-01', playtime: 120, kills: 15, kdRatio: 1.5 },
  { name: 'Minecraft', date: '2023-01-01', playtime: 90, kills: 0, kdRatio: 0 },
  { name: 'Roblox', date: '2023-01-01', playtime: 60, kills: 5, kdRatio: 1.2 },
  { name: 'Valorant', date: '2023-01-02', playtime: 150, kills: 20, kdRatio: 2.0 },
  { name: 'Minecraft', date: '2023-01-02', playtime: 100, kills: 0, kdRatio: 0 },
  { name: 'Roblox', date: '2023-01-02', playtime: 80, kills: 8, kdRatio: 1.5 },
];

const formatData = (data) => {
  const games = [...new Set(data.map(item => item.name))];
  return games.map(game => ({
    name: game,
    data: data.filter(item => item.name === game).map(item => ({
      date: item.date,
      playtime: item.playtime,
      kills: item.kills,
      kdRatio: item.kdRatio
    }))
  }));
};

const formattedData = formatData(gameData);

const getColorForGame = (gameName) => {
  switch (gameName) {
    case 'Valorant': return '#ffc658'; // Yellow
    case 'Minecraft': return '#ffeb3b'; // Bright Yellow
    case 'Roblox': return '#ff9800'; // Orange
    default: return '#000000';
  }
};

const ChartContainer = ({ title, children }) => (
  <Paper elevation={3} sx={{ p: 2, mb: 2, height: '100%', backgroundColor: '#1a237e', color: '#ffeb3b', textAlign: 'center' }}>
    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#ffeb3b' }}>
      {title}
    </Typography>
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  </Paper>
);

const OverviewBox = ({ title, value, unit }) => (
  <Paper elevation={3} sx={{ p: 2, mb: 2, height: '100%', backgroundColor: '#1a237e', color: '#ffeb3b', textAlign: 'center' }}>
    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
      {title}
    </Typography>
    <Typography variant="h4">{value} {unit}</Typography>
  </Paper>
);

const GameStatsDashboard = () => {
  const calculateTotalPlaytime = () => {
    return formattedData.reduce((total, game) => 
      total + game.data.reduce((gameTotal, day) => gameTotal + day.playtime, 0), 0
    );
  };

  const calculateTotalKills = () => {
    return formattedData.reduce((total, game) => 
      total + game.data.reduce((gameTotal, day) => gameTotal + day.kills, 0), 0
    );
  };

  const calculateAverageKDRatio = () => {
    const totalKDRatio = formattedData.reduce((total, game) => 
      total + game.data.reduce((gameTotal, day) => gameTotal + day.kdRatio, 0), 0
    );
    const totalDays = formattedData.reduce((total, game) => total + game.data.length, 0);
    return (totalKDRatio / totalDays).toFixed(2);
  };

  return (
    <Grid 
      container 
      spacing={3} 
      sx={{ 
        background: 'linear-gradient(135deg, #1a237e, #3d005a)', 
        minHeight: '100vh', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        width: '100%',
        margin: '0',
        p: 1, // Add padding here
      }}
    >
      <Grid item xs={12} md={9}>
        <ChartContainer title="Game Playtime Timeline">
          <LineChart data={formattedData[0].data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffeb3b" />
            <XAxis dataKey="date" stroke="#ffeb3b" />
            <YAxis stroke="#ffeb3b" />
            <Tooltip />
            <Legend />
            {formattedData.map(game => (
              <Line
                key={game.name}
                type="monotone"
                dataKey="playtime"
                data={game.data}
                name={game.name}
                stroke={getColorForGame(game.name)}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </Grid>
      <Grid item xs={12} md={3}>
        <OverviewBox title="Total Playtime" value={calculateTotalPlaytime()} unit="minutes" />
      </Grid>

      <Grid item xs={12} md={9}>
        <ChartContainer title="Kills Per Game">
          <BarChart data={formattedData[0].data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffeb3b" />
            <XAxis dataKey="date" stroke="#ffeb3b" />
            <YAxis stroke="#ffeb3b" />
            <Tooltip />
            <Legend />
            {formattedData.map(game => (
              <Bar
                key={game.name}
                dataKey="kills"
                data={game.data}
                name={game.name}
                fill={getColorForGame(game.name)}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </Grid>
      <Grid item xs={12} md={3}>
        <OverviewBox title="Total Kills" value={calculateTotalKills()} unit="" />
      </Grid>

      <Grid item xs={12} md={9}>
        <ChartContainer title="K/D Ratio Timeline">
          <LineChart data={formattedData[0].data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffeb3b" />
            <XAxis dataKey="date" stroke="#ffeb3b" />
            <YAxis stroke="#ffeb3b" />
            <Tooltip />
            <Legend />
            {formattedData.map(game => (
              <Line
                key={game.name}
                type="monotone"
                dataKey="kdRatio"
                data={game.data}
                name={game.name}
                stroke={getColorForGame(game.name)}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </Grid>
      <Grid item xs={12} md={3}>
        <OverviewBox title="Average K/D Ratio" value={calculateAverageKDRatio()} unit="" />
      </Grid>
    </Grid>
  );
};

export default GameStatsDashboard;