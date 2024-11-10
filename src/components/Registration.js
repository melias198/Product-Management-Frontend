import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Typography, Button, Box } from '@mui/material';

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    try {
      const response = await axios.post('https://zeroshop.onrender.com/user/register/', {
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

  
      if (response.data.token) {
        setSuccessMessage("Registration successful! Please log in.");
        setError('');  
        setFormData({
          username: '',
          email: '',
          first_name: '',
          last_name: '',
          password: '',
          confirmPassword: '',
        });
  
        
        setTimeout(() => {
          navigate('/login');
        },1000);
      }
      else
      {
        setError("Username or Email already exists!")
        setSuccessMessage(''); 
      } 
  
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        
        if (errorData.username) {
          setError(errorData.username[0]); 
        } else if (errorData.email) {
          setError(errorData.email[0]); 
        } else if (errorData.error) {
          setError(errorData.error); 
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
  
      setSuccessMessage(''); 
    }
  };
  
  
  

  return (
    <Container maxWidth="sm">
      <Box mt={5} mb={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
      </Box>

      {error && <Typography color="error">{error}</Typography>}
      {successMessage && <Typography color="primary">{successMessage}</Typography>}
    

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          variant="outlined"
          margin="normal"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="outlined"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          variant="outlined"
          margin="normal"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          variant="outlined"
          margin="normal"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          variant="outlined"
          margin="normal"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <Box mt={3} textAlign="center">
          <Button type="submit" variant="contained" color="primary" style={{marginBottom:'10px'}}> 
            Register
          </Button>
        </Box>
      </form>
    </Container>
  );
}
