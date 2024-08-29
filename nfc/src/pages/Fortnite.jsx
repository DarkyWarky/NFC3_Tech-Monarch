// src/Fortnite.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

const Fortnite = ({ accountId="7e9109209da84ac787807b771aaa4a3c"}) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`https://fortnite-api.com/v2/stats/d16d329c-6e7b-498d-bcec-aef0e8796136/v2/${accountId}`, {
          headers: {
            'Authorization': `Bearer d16d329c-6e7b-498d-bcec-aef0e8796136`,
          },
        });
        setStats(response.data.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [accountId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Fortnite Stats</Typography>
        <Typography variant="body1">Name: {stats.name}</Typography>
        <Typography variant="body1">Account Level: {stats.account.level}</Typography>
        <Typography variant="body1">Wins: {stats.stats.all.overall.wins}</Typography>
        <Typography variant="body1">Kills: {stats.stats.all.overall.kills}</Typography>
        <Typography variant="body1">Matches: {stats.stats.all.overall.matches}</Typography>
      </CardContent>
    </Card>
  );
};

export default Fortnite;
