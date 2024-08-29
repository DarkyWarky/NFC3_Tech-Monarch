import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Menu, MenuItem, Button, useScrollTrigger, Slide, Typography, Avatar, Box } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { motion } from 'framer-motion';

const navLinks = [
  { text: 'Home', href: '/' },
  { text: 'About Us', href: '/about' },
  { text: 'Contact', href: '/contact' },
];

const gameLinks = [
  { text: 'Valorant', href: '/game1' },
  { text: 'League Of Legends', href: '/game2' },
  { text: 'Pubg', href: '/game3' },
];

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar({ isAuthenticated = false, user = {} }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(0, 10, 50, 0.9)',
          transition: 'background-color 0.3s ease',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="src/components/logo.png" alt="Logo" style={{ height: 40, marginRight: 16 }} />
            <Typography variant="h6" sx={{ color: 'yellow', fontWeight: 'bold' }}>
              SkillSync
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <motion.div
                key={link.text}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  component={Link}
                  to={link.href}
                  sx={{
                    color: 'yellow',
                    mx: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 105, 180, 0.1)',
                    },
                  }}
                >
                  {link.text}
                </Button>
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                aria-controls="games-menu"
                aria-haspopup="true"
                onClick={handleClick}
                endIcon={<ArrowDropDown />}
                sx={{
                  color: 'yellow',
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 105, 180, 0.1)',
                  },
                }}
              >
                Games
              </Button>
            </motion.div>
            <Menu
              id="games-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: 'rgba(0, 10, 50, 0.9)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              {gameLinks.map((game) => (
                <MenuItem
                  key={game.text}
                  onClick={handleClose}
                  component={Link}
                  to={game.href}
                  sx={{
                    color: 'yellow',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 105, 180, 0.1)',
                    },
                  }}
                >
                  {game.text}
                </MenuItem>
              ))}
            </Menu>

            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Avatar
                  alt={user.username}
                  src={user.profilePicture}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
                <Typography variant="body1" sx={{ color: 'yellow' }}>
                  {user.username}
                </Typography>
              </Box>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: 'yellow',
                    border: '1px solid yellow',
                    ml: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 105, 180, 0.1)',
                    },
                  }}
                >
                  Login
                </Button>
              </motion.div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.shape({
    username: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
};

export default Navbar;