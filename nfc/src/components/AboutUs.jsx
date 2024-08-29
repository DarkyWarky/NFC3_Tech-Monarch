import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Container, Box, Button } from '@mui/material';
import { SportsEsports, EmojiEvents, People } from '@mui/icons-material';

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      damping: 10,
      stiffness: 100
    }
  }
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: { 
      type: 'spring',
      damping: 10,
      stiffness: 100,
      delay: 0.5
    }
  }
};

const AboutUs = () => {
  return (
    <Box 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      sx={{ 
        background: 'linear-gradient(45deg, #000033 30%, #000066 90%)',
        color: '#ffffff'
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography
            variant="h1"
            component="h1"
            className="mb-6 font-bold text-center"
            sx={{ 
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 'bold', 
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              color: '#ffff00',
              textShadow: '0 0 10px rgba(255,255,0,0.5)',
              marginBottom: 4
            }}
          >
            About SkillSync
          </Typography>

          <Typography
            variant="h5"
            className="text-center mb-8"
            sx={{ 
              fontFamily: 'Exo, sans-serif',
              color: '#ffffff',
              marginBottom: 4
            }}
          >
            Your Ultimate Team Building & Gaming Tournament Platform
          </Typography>

          <Box className="flex justify-center space-x-8 mb-8">
            <motion.div variants={iconVariants}>
              <SportsEsports sx={{ fontSize: 60, color: '#ffff00' }} />
            </motion.div>
            <motion.div variants={iconVariants}>
              <EmojiEvents sx={{ fontSize: 60, color: '#ffff00' }} />
            </motion.div>
            <motion.div variants={iconVariants}>
              <People sx={{ fontSize: 60, color: '#ffff00' }} />
            </motion.div>
          </Box>

          <Typography
            variant="body1"
            className="text-center mb-8"
            sx={{ 
              fontFamily: 'Exo, sans-serif',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: 4
            }}
          >
            Welcome to <span style={{ fontWeight: 'bold', color: '#ffff00' }}>SkillSync</span> — where gamers unite! 
            We're passionate about connecting players, organizing epic tournaments, and helping you build the ultimate gaming squad. 
            From intense e-sports showdowns to collaborative projects, SkillSync is your go-to platform for all things competitive gaming.
          </Typography>


        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutUs;