import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import GamePlaytimeChart from '../components/GamePlaytimeChart';

const PlaytimeDashboard = () => {
  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #1a237e, #3d005a)', // Dark gradient background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#ffeb3b', // Text color for yellow highlight
        
      }}
    >
      <Typography 
        variant="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          fontSize: '3rem', // Increased font size
          color: '#ffeb3b', // Yellow highlight for the heading
          textAlign: 'center' // Center alignment
        }}
      >
        Playtime Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <GamePlaytimeChart />
            </CardContent>
          </Card>
        </Grid>   
      </Grid>
      <Grid item xs={12} md={4}>
          <Card sx={{bgcolor:'white'}}>
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: '1.9rem',
                  color: 'blue', 
                  textAlign: 'center'
                }}
              >
                Overview
              </Typography>
              <Typography variant="body1">
                The chart displays the playtime across different games over time. Use this dashboard to monitor your gaming habits and identify trends.The Playtime Chart tracks the total time spent playing each game, highlighting changes in your gaming habits over time. The Kills Chart displays the number of kills achieved in each game, giving insight into your performance and proficiency. Finally, the K/D Ratio Chart illustrates the ratio of kills to deaths, revealing trends in your efficiency and effectiveness. Together, these charts provide a detailed overview of your gaming performance.
                
              </Typography>
              {/* Add more content or additional charts here */}
            </CardContent>           
          </Card>
        </Grid>
    </div>
  );
};

export default PlaytimeDashboard;