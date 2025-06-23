import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import { resetBuilder } from '../builder/builderSlice'; // Import resetBuilder
import { useNavigate } from 'react-router-dom';
import { Card, TextField, Button, CardContent, Typography, Box } from '@mui/material';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });

  const handleLogin = () => {
  if (!formData.username || !formData.password) {
    alert('Please fill in both username and password to login.');
    return;
  }
  localStorage.clear(); // Clear old persisted data
  dispatch(login());
  dispatch(resetBuilder()); // Reset SurveyBuilder state
  alert("Logged in successfully!");
  setTimeout(() => {
    navigate('/dashboard'); // Go to dashboard after login
  }, 0);
};


  const handleRegister = () => {
    // Validation for register: username, password & email required
    if (!formData.username || !formData.password || !formData.email) {
      alert('Please fill in username, password, and email to register.');
      return;
    }
    alert(`Registered:\nUsername: ${formData.username}\nEmail: ${formData.email}`);
    setIsRegister(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      background: 'linear-gradient(to right, #8E2DE2, #4A00E0)' 
    }}>
      {/* Centered Main Title */}
      <Typography variant="h3" sx={{ color: '#fff', fontWeight: 'bold', mb: 4 }}>
        Survey Central
      </Typography>

      <Card sx={{ padding: 4, borderRadius: 5 }}>
        <CardContent>
          <Typography variant="h4" align="center">
            {isRegister ? 'Create Account' : 'Welcome Back!'}
          </Typography>

          {isRegister && (
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              sx={{ my: 2 }}
            />
          )}

          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            sx={{ my: 2 }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            sx={{ my: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={isRegister ? handleRegister : handleLogin}
          >
            {isRegister ? 'Register' : 'Login'}
          </Button>

          <Typography
            align="center"
            sx={{ mt: 2, cursor: 'pointer' }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
