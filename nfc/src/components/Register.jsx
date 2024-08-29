import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, MenuItem, Select, FormControl, InputLabel, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { registerNewUser } from '../services/users';
import Login from './Login';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d47a1',
    },
    background: {
      default: '#0a1929',
      paper: '#0a1929',
    },
  },
});

const Register = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    friends: [],
    games: [],
    interests: [],
    lastActive: new Date(),
    location: '',
    preferences: {
      language: [],
      skillLevel: ''
    },
    profileImage: '',
    skills: [],
  });
  const [showLogin, setShowLogin] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith('preferences.')) {
      const [_, subName] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        preferences: {
          ...prevData.preferences,
          [subName]: subName === 'language' ? value.split(',').map(item => item.trim()) : value,
        },
      }));
    } else if (['games', 'interests', 'skills'].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map(item => item.trim()),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await registerNewUser(formData);
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const toggleForm = () => setShowLogin((prevShow) => !prevShow);

  const formFields = [
    [
      { name: 'username', label: 'Username', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
    ],
    [
      { name: 'bio', label: 'Bio', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'profileImage', label: 'Profile Image URL', type: 'text' },
    ],
    [
      { name: 'games', label: 'Games (comma-separated)', type: 'text', placeholder: 'e.g., Valorant, Roblox' },
      { name: 'interests', label: 'Interests (comma-separated)', type: 'text', placeholder: 'e.g., Strategy, FPS' },
      { name: 'skills', label: 'Skills (comma-separated)', type: 'text', placeholder: 'e.g., Sniper, Support' },
    ],
    [
      { name: 'preferences.language', label: 'Language Preferences (comma-separated)', type: 'text', placeholder: 'e.g., English, Hindi' },
      {
        name: 'preferences.skillLevel',
        label: 'Skill Level',
        type: 'select',
        options: [
          { value: 'Beginner', label: 'Beginner' },
          { value: 'Intermediate', label: 'Intermediate' },
          { value: 'Advanced', label: 'Advanced' },
        ],
      },
    ],
  ];

  const renderFields = (fields) => {
    return fields.map((field) => (
      <Grid item xs={12} key={field.name}>
        {field.type === 'select' ? (
          <FormControl fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.name}
              value={formData.preferences[field.name.split('.')[1]]}
              onChange={handleChange}
              variant="outlined"
              color="primary"
            >
              {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField
            fullWidth
            label={field.label}
            name={field.name}
            type={field.type}
            value={field.name.includes('preferences') ? formData.preferences[field.name.split('.')[1]].join(', ') : formData[field.name]}
            onChange={handleChange}
            variant="outlined"
            color="primary"
            required={field.required}
            placeholder={field.placeholder}
          />
        )}
      </Grid>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#0a1929' }}>
          <Typography variant="h4" gutterBottom color="primary">
            {showLogin ? 'Login' : 'Register'}
          </Typography>
          <Button onClick={toggleForm} variant="text" color="primary" fullWidth>
            {showLogin ? 'Create an Account' : 'Already have an account?'}
          </Button>
          {showLogin ? (
            <Login />
          ) : (
            <>
              <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
                {formFields.map((_, index) => (
                  <Step key={index}>
                    <StepLabel></StepLabel>
                  </Step>
                ))}
              </Stepper>
              <form onSubmit={(e) => e.preventDefault()}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Grid container spacing={3}>
                      {renderFields(formFields[step])}
                    </Grid>
                  </motion.div>
                </AnimatePresence>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                  <Grid item xs={6}>
                    <Button
                      onClick={prevStep}
                      variant="outlined"
                      color="primary"
                      fullWidth
                      disabled={step === 0}
                    >
                      Previous
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    {step === formFields.length - 1 ? (
                      <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
                        Register
                      </Button>
                    ) : (
                      <Button onClick={nextStep} variant="contained" color="primary" fullWidth>
                        Next
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
