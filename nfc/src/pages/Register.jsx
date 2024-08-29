import React, { useState } from 'react';
import {
  TextField, Button, Container, Grid, Typography, FormControl,
  InputLabel, Select, MenuItem, Paper, Stepper, Step, StepLabel
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { addUserToFirestore } from '../services/users'; // Import Firestore services

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
    games: [],
    genre: [],
    location: '',
    language: [],
    image: '',
    skillLevel: '',
    friends:[]
  });

  const handleChange = (event) => {
    const { name, value, type, multiple } = event.target;

    if (['games', 'genre', 'language'].includes(name)) {
      // Ensure these fields are always arrays
      setFormData(prevData => ({
        ...prevData,
        [name]: value.split(',').map(item => item.trim()),
      }));
    } else if (multiple) {
      setFormData(prevData => ({
        ...prevData,
        [name]: Array.from(event.target.selectedOptions, option => option.value),
      }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addUserToFirestore(formData);
      alert("User registered successfully!");
    } catch (error) {
      alert("Error registering user: " + error.message);
    }
  };

  const nextStep = () => setStep(prevStep => prevStep + 1);
  const prevStep = () => setStep(prevStep => prevStep - 1);

  const formFields = [
    [
      { name: 'username', label: 'Username', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
    ],
    [
      { name: 'bio', label: 'Bio', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'image', label: 'Profile Image URL', type: 'text' },
    ],
    [
      { name: 'games', label: 'Games (comma-separated)', type: 'text', placeholder: 'e.g., Valorant, Minecraft' },
      { name: 'genre', label: 'Genre (comma-separated)', type: 'text', placeholder: 'e.g., Horror, FPS' },
    ],
    [
      { name: 'language', label: 'Language (comma-separated)', type: 'text', placeholder: 'e.g., English' },
      {
        name: 'skillLevel',
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
              value={formData[field.name]}
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
            value={formData[field.name]}
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
            Register
          </Typography>
          <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
            {formFields.map((_, index) => (
              <Step key={index}>
                <StepLabel></StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit}>
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
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
