import React from 'react';
import { Box, Typography, Avatar, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { user } from '../services/userData'; // Import the user data

const Dashboard = () => {
  const InfoItem = ({ label, value }) => (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.05, color: "#ffeb3b" }}
      sx={{ mb: 2 }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: "#a0a0a0" }}>
        {label}
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );

  const RecentGameItem = ({ game, rank, score }) => (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.05, color: "#ffeb3b" }}
      sx={{ mb: 2 }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: "#a0a0a0" }}>
        {game}
      </Typography>
      <Typography variant="body2">Rank: {rank}</Typography>
      <Typography variant="body2">Score: {score}</Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        height: '130vh',
        width: '100vw',
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
          url('https://i.pinimg.com/originals/ec/31/12/ec31124f9d13dbd3d31efd38f5256cf8.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(5px)', // Slight blur effect
        color: "#fff",
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        boxSizing: 'border-box',
        backgroundColor: '#003366', // Dark blue background
        backgroundBlendMode: 'multiply' // Darken the background image
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexWrap: 'wrap' }}>
        <Avatar
          alt={user.name}
          src={user.profilePhoto}
          sx={{ 
            width: 150, 
            height: 150, 
            border: '3px solid #ffeb3b',
            mr: 3,
            mb: 2
          }}
        />
        <Box sx={{ maxWidth: '600px' }}>
          <Typography variant="h3" component="div" sx={{ color: "#ffeb3b", mb: 1 }}>
            {user.name}
          </Typography>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            {user.gamingName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {user.bio}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 4, mb: 4 }}>
        <InfoItem label="Email" value={user.email} />
        <InfoItem label="Location" value={user.location} />
        <InfoItem label="Last Active" value={user.lastActive} />
        <InfoItem label="Games" value={user.games.join(", ")} />
        <InfoItem label="Interests" value={user.interests.join(", ")} />
        <InfoItem label="Languages" value={user.preferences.languages.join(", ")} />
        <InfoItem label="Skill Level" value={user.preferences.skillLevel} />
        <InfoItem label="Actual Skills" value={user.actualSkills} />
      </Box>

      <Divider sx={{ my: 4, bgcolor: '#ffeb3b' }} />

      <Typography variant="h6" sx={{ mb: 2, color: '#ffeb3b' }}>
        Performance Tracking
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 4 }}>
        <InfoItem label="Matches Played" value={user.performance.matchesPlayed} />
        <InfoItem label="Win Rate" value={user.performance.winRate} />
        <InfoItem label="Highest Score" value={user.performance.highestScore} />
        <InfoItem label="Average Score" value={user.performance.averageScore} />
        <InfoItem label="Most Played Game" value={user.performance.mostPlayedGame} />
      </Box>

      <Divider sx={{ my: 4, bgcolor: '#ffeb3b' }} />

      <Typography variant="h6" sx={{ mb: 2, color: '#ffeb3b' }}>
        Recent Game Performance
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 4 }}>
        {user.performance.recentGames.map((game, index) => (
          <RecentGameItem
            key={index}
            game={game.game}
            rank={game.rank}
            score={game.score}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
