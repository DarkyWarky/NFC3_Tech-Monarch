import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import GamePlaytimeChart from '../components/GamePlaytimeChart';

const PlaytimeDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Playtime Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <GamePlaytimeChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
              <Typography variant="body1">
                The chart displays the playtime across different games over time. Use this dashboard to monitor your gaming habits and identify trends.
              </Typography>
              {/* Add more content or additional charts here */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PlaytimeDashboard;
