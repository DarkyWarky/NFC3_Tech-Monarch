import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <Box
      component={motion.footer}

      transition={{ duration: 0.8 }}
      sx={{
        bgcolor: 'transparent',
        color: 'gray',
        textAlign: 'center',
        padding: '20px 0',
        position: 'relative',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Typography variant="body2">
        © 2024 Your Company. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link href="mailto:info@yourcompany.com" color="inherit" underline="hover">
          info@yourcompany.com
        </Link>
      </Typography>
      <Typography variant="body2">
        <Link href="/terms" color="inherit" underline="hover">
          Terms & Conditions
        </Link>{' '}
        |{' '}
        <Link href="/privacy" color="inherit" underline="hover">
          Privacy Policy
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;