// src/components/TournamentCard.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const TournamentCard = ({ tournament }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ backgroundColor: '#003366', color: 'yellow', margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {tournament.name}
          </Typography>
          <Typography variant="body2">
            Date: {tournament.date}
          </Typography>
          <Typography variant="body2">
            Prize: {tournament.prize}
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Join Now
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TournamentCard;
