import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What is SkillSync?",
    answer: "SkillSync is a gaming teammate finder website designed to help gamers connect with like-minded players who have complementary skills and playstyles."
  },
  {
    question: "How does SkillSync match players?",
    answer: "SkillSync uses an advanced algorithm that considers factors such as gaming preferences, skill levels, play schedules, and communication styles to suggest optimal teammate matches."
  },
  {
    question: "Is SkillSync free to use?",
    answer: "Yes, SkillSync offers a free basic membership. We also offer a premium tier with additional features for a monthly subscription fee."
  },
  {
    question: "What games does SkillSync support?",
    answer: "SkillSync supports a wide range of popular multiplayer games across various genres, including FPS, MOBA, Battle Royale, and MMORPGs. We're constantly adding new games based on user demand."
  },
  {
    question: "How can I improve my chances of finding a good teammate?",
    answer: "Complete your profile thoroughly, be honest about your skill level, and clearly state your gaming goals and preferences. Active participation in the SkillSync community also helps in finding compatible teammates."
  },
  {
    question: "What should I do if I have a negative experience with a matched teammate?",
    answer: "We encourage open communication to resolve conflicts. However, if issues persist, you can report inappropriate behavior through our in-app reporting system. We take all reports seriously to maintain a positive gaming environment."
  }
];

const FAQ = () => {
  const [formData, setFormData] = useState({ name: '', email: '', query: '' });
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setFormErrors(prevState => ({ ...prevState, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.query.trim()) errors.query = 'Query is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', query: '' });
      setSnackbarMessage('Query sent successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else {
      setFormErrors(errors);
      setSnackbarMessage('Please fill all required fields correctly.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#0a192f',
        color: 'white',
        minHeight: '100vh',
        backgroundImage: 'url("https://www.pixel4k.com/wp-content/uploads/2023/12/omen-valorant-shrouded-in-darkness-game-4k-3840x2160_1703457383-2048x1152.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(10, 25, 47, 0.8)', // Adjusted opacity for better readability
        marginTop: '40px',
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      <Grid container spacing={4} sx={{ padding: 4 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" gutterBottom sx={{ 
              color: '#ffd700', 
              marginBottom: 4, 
              paddingLeft: '50px', 
              fontWeight: 'bold',
            }}>
              FAQs
            </Typography>
          </motion.div>
          <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
            <AnimatePresence>
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Accordion
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      borderRadius: 2,
                      '&:before': {
                        display: 'none',
                      },
                      '& .MuiAccordionSummary-root': {
                        borderBottom: '1px solid #ffd700',
                      },
                      marginBottom: 2,
                      boxShadow: '0 4px 6px rgba(255, 215, 0, 0.1)',
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={{ color: '#ffd700' }} />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Typography variant="h6" sx={{ 
                        color: '#ffd700', 
                        fontWeight: 'bold',
                      }}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography sx={{ fontWeight: 600, fontStyle: 'italic' }}>
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: 600, margin: '0 auto', mt: 4 }}>
            <Typography variant="h2" gutterBottom sx={{ 
              color: '#ffd700', 
              mb: 3, 
              fontWeight: 'bold',
            }}>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                error={!!formErrors.name}
                helperText={formErrors.name}
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ffd700' },
                    '&:hover fieldset': { borderColor: '#ffd700' },
                    '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                  },
                  '& .MuiInputLabel-root': { color: '#ffd700' },
                  '& .MuiInputBase-input': { color: 'white', fontWeight: 600 },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                error={!!formErrors.email}
                helperText={formErrors.email}
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ffd700' },
                    '&:hover fieldset': { borderColor: '#ffd700' },
                    '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                  },
                  '& .MuiInputLabel-root': { color: '#ffd700' },
                  '& .MuiInputBase-input': { color: 'white', fontWeight: 600 },
                }}
              />
              <TextField
                fullWidth
                label="Query"
                name="query"
                value={formData.query}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                error={!!formErrors.query}
                helperText={formErrors.query}
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ffd700' },
                    '&:hover fieldset': { borderColor: '#ffd700' },
                    '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                  },
                  '& .MuiInputLabel-root': { color: '#ffd700' },
                  '& .MuiInputBase-input': { color: 'white', fontWeight: 600 },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ 
                  backgroundColor: '#ffd700', 
                  color: 'black', 
                  marginTop: 2, 
                  '&:hover': { backgroundColor: '#ffcc00' },
                }}
              >
                Send Query
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FAQ;
