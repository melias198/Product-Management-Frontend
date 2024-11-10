import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiClient from './JWT';
import {Container,Typography,Card,CardContent,Button,Grid,Divider,Dialog,DialogContent,DialogActions,} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://zeroshop.onrender.com/api/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <Container style={{ textAlign: 'center', padding: '50px' }}>
        <Typography variant="h5">Loading Product Details...</Typography>
      </Container>
    );
  }

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/products/${id}/`);
      setShowDeletePopup(false);
      navigate('/products'); 
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setShowDeletePopup(false);
        setShowPermissionPopup(true); 
      } else {
        console.error("Error deleting product:", error);
        setShowPermissionPopup(true);

      }
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '30px' }}>
      <Card style={{ padding: '20px', boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
            <ShoppingBagIcon style={{ fontSize: "100px", color: "#888" }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Price: ${product.price}
              </Typography>
              <Divider style={{ margin: '10px 0' }} />
              <Typography variant="body1" style={{ lineHeight: 1.6 }}>
                {product.description}
              </Typography>
              <Divider style={{ margin: '20px 0' }} />

              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(-1)}
                  style={{ marginRight: '10px' }}
                >
                  Go Back
                </Button>
                <Button
                  component={Link} 
                  to={`/products/${product.id}/edit`} 
                  variant="contained" 
                  color="success" 
                  style={{ marginRight: '10px' }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setShowDeletePopup(true)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* Delete Confirmation Popup */}
      <Dialog open={showDeletePopup} onClose={() => setShowDeletePopup(false)}>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeletePopup(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Permission Denied Popup */}
      <Dialog open={showPermissionPopup} onClose={() => setShowPermissionPopup(false)}>
        <DialogContent>
          <Typography>You do not have permission to delete this product.</Typography>
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
