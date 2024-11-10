import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';

export function CreateProduct() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        'https://zeroshop.onrender.com/api/products/',
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowSuccessPopup(true); 
      setProductData({ name: '', description: '', price: '', quantity: '' });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setShowPermissionPopup(true); 
      } else {
        console.error("Error creating product:", error);
        alert("Failed to create product. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={productData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={productData.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Product
        </Button>
      </form>

      {/* Success Popup */}
      <Dialog open={showSuccessPopup} onClose={() => setShowSuccessPopup(false)}>
        <DialogContent>
          <Typography>Product created successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuccessPopup(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Permission Denied Popup */}
      <Dialog open={showPermissionPopup} onClose={() => setShowPermissionPopup(false)}>
        <DialogContent>
          <Typography>You do not have permission to create this product.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPermissionPopup(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
