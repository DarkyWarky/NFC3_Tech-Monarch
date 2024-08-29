import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, Paper, Container, createTheme, ThemeProvider } from '@mui/material';
import { EmojiEvents, SportsEsports, EmojiEventsOutlined } from '@mui/icons-material';



const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFF00', // Yellow for highlights
    },
    secondary: {
      main: '#FF00FF', // Neon purple for accents
    },
    background: {
      default: 'transparent',
      paper: 'rgba(0, 0, 128, 0.6)', // Semi-transparent dark blue for paper elements
    },
  },
  typography: {
    fontFamily: '"Press Start 2P", cursive',
  },
});

const MatchBox = ({ team1, team2, winner, onWinnerSelect }) => (
  <Paper 
    elevation={3}
    sx={{
      width: 220,
      p: 2,
      m: 1,
      bgcolor: 'background.paper',
      borderRadius: 2,
      cursor: 'pointer',
      border: '2px solid',
      borderColor: 'primary.main',
      boxShadow: '0 0 10px #FFFF00',
    }}
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onWinnerSelect(team1)}
    >
      <Typography color={winner === team1 ? 'primary' : 'text.primary'} sx={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>
        <SportsEsports sx={{ mr: 1, fontSize: '1rem' }} /> {team1}
      </Typography>
    </motion.div>
    <Box sx={{ height: 1, bgcolor: 'primary.main', my: 1 }} />
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onWinnerSelect(team2)}
    >
      <Typography color={winner === team2 ? 'primary' : 'text.primary'} sx={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}>
        <SportsEsports sx={{ mr: 1, fontSize: '1rem' }} /> {team2}
      </Typography>
    </motion.div>
  </Paper>
);

const ConnectingLine = ({ direction = 'horizontal', length = 50, thickness = 2 }) => (
  <Box sx={{ 
    width: direction === 'horizontal' ? length : thickness, 
    height: direction === 'vertical' ? length : thickness, 
    bgcolor: 'primary.main', 
    position: 'absolute', 
    boxShadow: '0 0 5px #FFFF00',
    ...(direction === 'horizontal' ? { left: '100%', top: '50%', transform: 'translateY(-50%)' } : { left: '100%', top: 0 })
  }} />
);

const Sparkle = () => {
  const style = {
    position: 'absolute',
    width: '2px',
    height: '2px',
    backgroundColor: '#FFFF00',
    borderRadius: '50%',
    opacity: Math.random(),
    animation: `twinkle ${Math.random() * 5 + 2}s linear infinite`,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  };

  return <div style={style} />;
};

const Tournament = () => {
  const [winners, setWinners] = useState({
    round1: ['', '', '', ''],
    round2: ['', ''],
    final: '',
  });

  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    setSparkles(Array.from({ length: 50 }, (_, i) => <Sparkle key={i} />));
  }, []);

  const handleWinnerSelect = (round, matchIndex, winner) => {
    setWinners(prev => {
      const newWinners = { ...prev };
      newWinners[round][matchIndex] = winner;
      return newWinners;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          background: 'linear-gradient(135deg, #00008B 0%, #000000 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {sparkles}
        <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" color="primary" gutterBottom align="center" sx={{ mb: 4, fontFamily: 'Orbitron, sans-serif',fontSize: '3rem', fontWeight: 'bold', textShadow: '0 0 15px #FFFF00' }}>
            <EmojiEvents sx={{ mr: 2, fontSize: '4rem' }} />
            SkillSync Tournament
            <EmojiEvents sx={{ ml: 2, fontSize: '4rem' }} />
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '80vh' }}>
              {[0, 1, 2, 3].map((index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <MatchBox
                    team1={`Team ${String.fromCharCode(65 + index * 2)}`}
                    team2={`Team ${String.fromCharCode(66 + index * 2)}`}
                    winner={winners.round1[index]}
                    onWinnerSelect={(winner) => handleWinnerSelect('round1', index, winner)}
                  />
                  <ConnectingLine length={60} />
                  {index % 2 === 0 && <ConnectingLine direction="vertical" length={200} />}
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', height: '40vh', mt: '20vh' }}>
              {[0, 1].map((index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <MatchBox
                    team1={winners.round1[index * 2]}
                    team2={winners.round1[index * 2 + 1]}
                    winner={winners.round2[index]}
                    onWinnerSelect={(winner) => handleWinnerSelect('round2', index, winner)}
                  />
                  <ConnectingLine length={60} />
                  {index === 0 && <ConnectingLine direction="vertical" length={200} />}
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <Box sx={{ position: 'relative' }}>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: winners.final ? 1.1 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <MatchBox
                    team1={winners.round2[0]}
                    team2={winners.round2[1]}
                    winner={winners.final}
                    onWinnerSelect={(winner) => setWinners(prev => ({ ...prev, final: winner }))}
                  />
                </motion.div>
                <ConnectingLine length={60} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: winners.final ? 1 : 0, scale: winners.final ? 1.2 : 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Paper 
                  elevation={6}
                  sx={{
                    width: 220,
                    p: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: '4px solid',
                    borderColor: 'yellow',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 0 20px #eeff41',
                  }}
                >
                  <EmojiEventsOutlined sx={{ fontSize: '4rem', color: 'yellow', mb: 2 }} />
                  <Typography variant="h5" color="yellow" sx={{ mb: 1, textAlign: 'center', fontSize: '1.2rem' }}>
                    Champion
                  </Typography>
                  <Typography variant="h4" color="yellow" sx={{ textAlign: 'center', fontSize: '1.5rem' }}>
                    {winners.final || '???'}
                  </Typography>
                </Paper>
              </motion.div>
            </Box>
          </Box>
        </Container>
      </Box>
      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0; }
          50% { opacity: 2; }
          100% { opacity: 0; }
        }
      `}</style>
    </ThemeProvider>
  );
};

export default Tournament;
