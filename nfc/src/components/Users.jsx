import React, { useEffect, useState } from "react";
import { readDocuments, updateDocument } from "../services/users"; // Replace with the correct path
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  Container, 
  Grid, 
  TextField, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  Button,
  Snackbar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a237e', // dark blue
    },
    secondary: {
      main: '#ffd600', // yellow
    },
    background: {
      default: '#0d1117',
      paper: '#1a237e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffd600',
    },
  },
});

const filterOptions = {
  games: ['Fortnite', 'Minecraft', 'Call of Duty', 'League of Legends', 'Among Us'],
  genres: ['FPS', 'MOBA', 'RPG', 'Strategy', 'Puzzle'],
  locations: ['North America', 'Europe', 'Asia', 'South America', 'Australia'],
  skillLevels: ['Beginner', 'Intermediate', 'Advanced', 'Pro']
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    games: "",
    genre: "",
    location: "",
    skillLevel: "",
  });
  const [notification, setNotification] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await readDocuments("users");
      const usersArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersArray);
      setFilteredUsers(usersArray);
      
      // For demo purposes, set the first user as the current user
      setCurrentUser(usersArray[0]);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    let filtered = users;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(user => {
          const userValue = user[key];
          if (Array.isArray(userValue)) {
            return userValue.some(item => item.toLowerCase().includes(value.toLowerCase()));
          } else if (typeof userValue === 'string') {
            return userValue.toLowerCase().includes(value.toLowerCase());
          }
          return false;
        });
      }
    });

    setFilteredUsers(filtered);
  }, [filters, users]);

  const sendFriendRequest = async (userId) => {
    if (!currentUser) return;

    try {
      // Update the current user's sent friend requests
      await updateDocument("users", currentUser.id, {
        sentFriendRequests: [...(currentUser.sentFriendRequests || []), userId]
      });

      // Update the target user's received friend requests
      await updateDocument("users", userId, {
        receivedFriendRequests: [...(users.find(u => u.id === userId).receivedFriendRequests || []), currentUser.id]
      });

      setNotification(`Friend request sent to ${users.find(u => u.id === userId).username}`);
    } catch (error) {
      console.error("Error sending friend request: ", error);
      setNotification("Failed to send friend request. Please try again.");
    }
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <IconButton color="secondary" onClick={handleNotificationClick}>
              <Badge badgeContent={currentUser?.receivedFriendRequests?.length || 0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
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
          <Grid container spacing={3} justifyContent="center" mb={4}>
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

          <Grid container spacing={3} justifyContent="center">
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card sx={{ height: 450, display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={user.image || "https://via.placeholder.com/200x200"}
                    alt={`${user.username}'s profile`}
                    sx={{ objectFit: 'cover',maxHeight:'150px',maxWidth:'150px' }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography gutterBottom variant="h5" component="div" color="secondary">
                        {user.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">Email: {user.email}</Typography>
                      <Typography variant="body2" color="text.secondary">Location: {user.location}</Typography>
                      <Typography variant="body2" color="text.secondary">Skill Level: {user.skillLevel}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Games: {Array.isArray(user.games) ? user.games.join(", ") : user.games}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Genre: {Array.isArray(user.genre) ? user.genre.join(", ") : user.genre}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Language: {Array.isArray(user.language) ? user.language.join(", ") : user.language}
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      startIcon={<PersonAddIcon />}
                      onClick={() => sendFriendRequest(user.id)}
                      disabled={currentUser && (currentUser.id === user.id || 
                                (currentUser.sentFriendRequests && currentUser.sentFriendRequests.includes(user.id)) ||
                                (currentUser.friends && currentUser.friends.includes(user.id)))}
                    >
                      Add Friend
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={!!notification}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          message={notification}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseNotification}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Box>
    </ThemeProvider>
  );
};

export default Users;