// GamePlaytimeChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import gameData from '../services/gameData';
import { Paper, Typography } from '@mui/material';

// Format data to separate lines by game
const formatData = (data) => {
  const games = [...new Set(data.map(item => item.name))];
  return games.map(game => ({
    name: game,
    data: data.filter(item => item.name === game).map(item => ({
      date: item.date,
      playtime: item.playtime
    }))
  }));
};

const formattedData = formatData(gameData);

const GamePlaytimeChart = () => {
  return (
    <Paper style={{ padding: '16px', margin: '16px', overflowX: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Game Playtime Timeline
      </Typography>
      <LineChart
        width={800}
        height={400}
        data={formattedData.flatMap(game => game.data)}
        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
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
    </Paper>
  );
};

// Utility function to get colors for different games
const getColorForGame = (gameName) => {
  switch (gameName) {
    case 'Valorant': return '#8884d8';
    case 'Minecraft': return '#82ca9d';
    case 'Roblox': return '#ffc658';
    default: return '#000000';
  }
};

export default GamePlaytimeChart;
