import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  Button,
  Chip,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  AppBar,
  Toolbar,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700', // Yellow
    },
    secondary: {
      main: '#00008B', // Dark Blue
    },
    background: {
      default: '#000033', // Very Dark Blue
      paper: '#000066', // Dark Blue
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#FFD700', // Yellow
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

const sampleUsers = [
  {
    id: 1,
    username: 'NeonSlayer',
    email: 'neonslayer@gmail.com',
    location: 'North America',
    skillLevel: 'Pro',
    games: ['Valorant', 'Overwatch'],
    genre: 'FPS',
    language: ['English'],
    image: 'https://via.placeholder.com/200?text=NS',
    sentFriendRequests: [],
    receivedFriendRequests: [2],
    friends: [],
  },
  {
    id: 2,
    username: 'PixelPrincess',
    email: 'pixelprincess@gmail.com',
    location: 'Europe',
    skillLevel: 'Advanced',
    games: ['League of Legends', 'Dota 2'],
    genre: 'MOBA',
    language: ['English', 'French'],
    image: 'https://via.placeholder.com/200?text=PP',
    sentFriendRequests: [1],
    receivedFriendRequests: [],
    friends: [],
  },
  {
    id: 3,
    username: 'CyberSamurai',
    email: 'cybersamurai@gmail.com',
    location: 'Asia',
    skillLevel: 'Intermediate',
    games: ['Cyberpunk 2077', 'The Witcher 3'],
    genre: 'RPG',
    language: ['Japanese', 'English'],
    image: 'https://via.placeholder.com/200?text=CS',
    sentFriendRequests: [],
    receivedFriendRequests: [],
    friends: [1],
  },
  {
    id: 4,
    username: 'StrategyMaster',
    email: 'strategymaster@gmail.com',
    location: 'South America',
    skillLevel: 'Pro',
    games: ['Civilization VI', 'Age of Empires IV'],
    genre: 'Strategy',
    language: ['Portuguese', 'Spanish', 'English'],
    image: 'https://via.placeholder.com/200?text=SM',
    sentFriendRequests: [2],
    receivedFriendRequests: [],
    friends: [],
  },
  {
    id: 5,
    username: 'QuestHunter',
    email: 'questhunter@gmail.com',
    location: 'Australia',
    skillLevel: 'Advanced',
    games: ['World of Warcraft', 'Final Fantasy'],
    genre: 'MMORPG',
    language: ['English'],
    image: 'https://via.placeholder.com/200?text=QH',
    sentFriendRequests: [],
    receivedFriendRequests: [1],
    friends: [],
  },
  {
    id: 6,
    username: 'Baggy Pants',
    email: 'baggypants@gmail.com',
    location: 'Indonesia',
    skillLevel: 'Beginner',
    games: ['World of Warcraft', 'Valorant'],
    genre: 'MMORPG',
    language: ['English','Hindi'],
    image: 'https://via.placeholder.com/200?text=QH',
    sentFriendRequests: [],
    receivedFriendRequests: [1],
    friends: [],
  },
];

const filterOptions = {
  games: ['Valorant', 'Overwatch', 'League of Legends', 'Dota 2', 'Cyberpunk 2077', 'The Witcher 3', 'Civilization VI', 'Age of Empires IV', 'World of Warcraft', 'Final Fantasy XIV'],
  genres: ['FPS', 'MOBA', 'RPG', 'Strategy', 'MMORPG'],
  locations: ['North America', 'Europe', 'Asia', 'South America', 'Australia'],
  skillLevels: ['Beginner', 'Intermediate', 'Advanced', 'Pro']
};

const Users = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [filteredUsers, setFilteredUsers] = useState(sampleUsers);
  const [filters, setFilters] = useState({
    games: "",
    genre: "",
    location: "",
    skillLevel: "",
  });
  const [notification, setNotification] = useState(null);
  const [currentUser] = useState(sampleUsers[0]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    let filtered = users;
    if (value) {
      filtered = users.filter(user => {
        const userValue = user[name];
        if (Array.isArray(userValue)) {
          return userValue.some(item => item.toLowerCase().includes(value.toLowerCase()));
        } else if (typeof userValue === 'string') {
          return userValue.toLowerCase().includes(value.toLowerCase());
        }
        return false;
      });
    }
    setFilteredUsers(filtered);
  };

  const sendFriendRequest = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return { ...user, sentFriendRequests: [...user.sentFriendRequests, userId] };
      }
      if (user.id === userId) {
        return { ...user, receivedFriendRequests: [...user.receivedFriendRequests, currentUser.id] };
      }
      return user;
    });
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setNotification(`Friend request sent to ${users.find(u => u.id === userId).username}`);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <SportsEsportsIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
              GamersUnite
            </Typography>
            <IconButton color="primary" onClick={handleNotificationClick}>
              <Badge badgeContent={currentUser?.receivedFriendRequests?.length || 0} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Find Gaming Buddies
        </Typography>

        <Box mb={4}>
          <Typography variant="h5" align="center" gutterBottom color="primary">
            Filters
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {Object.entries(filters).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id={`${key}-label`}>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                  <Select
                    labelId={`${key}-label`}
                    name={key}
                    value={value}
                    onChange={handleFilterChange}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {filterOptions[key === 'genre' ? 'genres' : `${key}s`]?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Grid container spacing={2}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-5px)',
                    transition: 'all 0.3s ease-in-out'
                  },
                  maxWidth: 300,
                  margin: 'auto',
                }}>
                  <CardMedia
                    component="img"
                    height="100"
                    image={user.image}
                    alt={`${user.username}'s profile`}
                    sx={{
                      borderRadius: '50%',
                      width: 100,
                      height: 100,
                      margin: '16px auto 0',
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div" color="primary">
                      {user.username}
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5} mb={1}>
                      <Chip label={user.location} size="small" color="primary" />
                      <Chip label={user.skillLevel} size="small" color="secondary" />
                      <Chip label={user.genre} size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Games: {user.games.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Languages: {user.language.join(', ')}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      startIcon={<PersonAddIcon />}
                      onClick={() => sendFriendRequest(user.id)}
                      disabled={currentUser.sentFriendRequests.includes(user.id) || currentUser.friends.includes(user.id)}
                    >
                      {currentUser.sentFriendRequests.includes(user.id) ? 'Request Sent' : 
                       currentUser.friends.includes(user.id) ? 'Friends' : 'Add Friend'}
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationClose}
        >
          {currentUser?.receivedFriendRequests?.length ? (
            currentUser.receivedFriendRequests.map((requestId) => (
              <MenuItem key={requestId} onClick={handleNotificationClose}>
                Friend request from {users.find(u => u.id === requestId)?.username}
              </MenuItem>
            ))
          ) : (
            <MenuItem onClick={handleNotificationClose}>No new notifications</MenuItem>
          )}
        </Menu>

        <Snackbar
          open={Boolean(notification)}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          message={notification}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseNotification}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Container>
    </ThemeProvider>
  );
};

export default Users;