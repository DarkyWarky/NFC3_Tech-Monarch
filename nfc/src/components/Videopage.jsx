import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

// Styled Typography with animation and font
const AnimatedTypography = styled(motion(Typography))`
  font-family: 'Press Start 2P', cursive;
  font-weight: bold;
  text-align: center;
  color: #f8e71c;
`;

// Styled Typography for the slogan with a different font
const SloganTypography = styled(Typography)`
  font-family: 'Arial', sans-serif;
  font-weight: normal;
  text-align: center;
  color: #ffffff; /* Contrasting color */
  margin-top: 20px; /* Space between heading and slogan */
`;

// Highlighted text style
const HighlightedText = styled('span')`
  color: #f8e71c; /* Yellow color */
  font-weight: bold;
`;

const textVariants = {
  initial: {
    scale: 1,
    color: '#f8e71c'
  },
  animate: {
    scale: 1.1,
    color: '#f4a261',
    transition: {
      duration: 2,
      yoyo: Infinity
    }
  }
};

const Videopage = () => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'hidden' }}>
        <video
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
          src="./public/BestVideo.mp4"
          title="Background Video"
          autoPlay
          loop
          muted
        />
      </div>

      {/* Overlay Content */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <AnimatedTypography
          variant="h1"
          initial="initial"
          animate="animate"
          variants={textVariants}
          style={{ fontSize: '6rem', '@media (min-width: 768px)': { fontSize: '8rem' } }}
        >
          SkillSync
        </AnimatedTypography>
        <SloganTypography
          variant="h2"
          style={{ fontSize: '1.5rem', '@media (min-width: 768px)': { fontSize: '2rem' } }}
        >
          <HighlightedText>From Solo to Squad</HighlightedText> – Find Your Gaming Allies Here!
        </SloganTypography>
      </div>
    </div>
  );
}

export default Videopage;