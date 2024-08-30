import React, { useState } from 'react';
import {
  TextField, Button, Container, Grid, Typography, FormControl,
  InputLabel, Select, MenuItem, Paper, Stepper, Step, StepLabel, Box
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { addUserToFirestore } from '../services/users';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffc107', // Yellow color for primary elements
    },
    secondary: {
      main: '#0d47a1', // Dark blue for secondary elements
    },
    background: {
      default: '#0a1929',
      paper: '#0a1929',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
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
    friends: []
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, multiple } = event.target;

    if (['games', 'genre', 'language'].includes(name)) {
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
      setShowConfetti(true);
      setRegistrationSuccess(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
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

  const isStepValid = () => {
    return formFields[step].every(field => {
      if (field.required) {
        return formData[field.name].trim() !== '';
      }
      return true;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundImage:`linear-gradient(rgba(10, 25, 41, 0.8), rgba(10, 25, 41, 0.8)) , url('https://i.pinimg.com/originals/2e/a4/28/2ea4283c5f81b91227bc4a9e05c2b825.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          
        }}
      >
        <Container component="main" maxWidth="sm">
          <Paper 
            elevation={5} 
            sx={{ 
              p: 4, 
              backgroundColor: 'background.paper', 
              borderRadius: 2,
              
            }}
          >
            <Typography variant="h4" gutterBottom color="primary" align="center">
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
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
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
                    <Button 
                      onClick={handleSubmit} 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      disabled={!isStepValid()}
                    >
                      Register
                    </Button>
                  ) : (
                    <Button 
                      onClick={nextStep} 
                      variant="contained" 
                      color="primary" 
                      fullWidth
                      disabled={!isStepValid()}
                    >
                      Next
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
      {showConfetti && <Confetti />}
      {registrationSuccess && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            backgroundColor: 'rgba(10, 25, 41, 0.9)',
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" align="center" color="primary">
            Registration Successful!
          </Typography>
          <Typography variant="body1" align="center" color="white" sx={{ mt: 2 }}>
            Welcome to our gaming community!
          </Typography>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default Register;