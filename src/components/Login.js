import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Typography, Button, Box } from '@mui/material';
import { AuthContext } from './Auth';



export function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });


  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); 
  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://zeroshop.onrender.com/user/api/token/', {
        username: formData.username,
        password: formData.password,
      });
      const { access, refresh } = response.data;


      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);  


      setSuccessMessage("Login successful!");
      setError('');
      setFormData({
        username: '',
        password: '',
      });

      login(access)
      navigate('/');
    } catch (error) {
      setError("Login failed. Check your credentials and try again.");
      setSuccessMessage('');
    }
  };

  return (

    <Container maxWidth="sm">
      <Box mt={5} mb={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
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
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Box mt={3} textAlign="center">
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
    </Container>

    
  );
}
