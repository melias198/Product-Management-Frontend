import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from './JWT'; 

export function ProductUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [showPermissionPopup, setShowPermissionPopup] = useState(false); 
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/api/products/${id}/`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Failed to load product details.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiClient.put(`/api/products/${id}/`, productData);
      setShowSuccessPopup(true);
      navigate(`/products/${id}`);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setShowPermissionPopup(true); 
      } else {
        console.error("Error updating product:", error);
        setShowPermissionPopup(true);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Update Product
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
          Update Product
        </Button>
      </form>

      {/* Permission Popup */}
      <Dialog open={showPermissionPopup} onClose={() => setShowPermissionPopup(false)}>
        <DialogContent>
          <Typography>You do not have permission to perform this action.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPermissionPopup(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
       {/* Success Popup */}
       <Dialog open={showSuccessPopup} onClose={() => { setShowSuccessPopup(false); navigate(`/products/${id}`); }}>
        <DialogContent>
          <Typography>Product updated successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setShowSuccessPopup(false); navigate(`/products/${id}`); }} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
