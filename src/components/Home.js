import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('https://zeroshop.onrender.com/api/products/', {
          params: { featured: true }  
        });
        setFeaturedProducts(response.data.results || []);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <Container className="my-5">
      <Typography variant="h3" align="center" gutterBottom>
        Featured Products
      </Typography>

      <Grid container spacing={4}>
        {featuredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card 
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent style={{ textAlign: 'center' }}>
                <Typography variant="h5" style={{ fontWeight: 600 }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px', marginBottom: '10px' }}>
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </Typography>
                <Typography variant="h6" color="textPrimary" style={{ fontWeight: 700, color: "#1b5e20" }}>
                  ${product.price}
                </Typography>
              </CardContent>
              <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <Button
                  component={Link}
                  to={`/products/${product.id}`}
                  variant="contained"
                  style={{ backgroundColor: "#3f51b5", color: "#fff" }}
                >
                  View Details
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
