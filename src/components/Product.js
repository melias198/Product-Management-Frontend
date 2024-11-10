import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button, TextField, Pagination } from '@mui/material';

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://zeroshop.onrender.com/api/products/', {
          params: {
            search: searchTerm,  
            page: currentPage
          }
        });
        setProducts(response.data.results || []);
        setTotalPages(Math.ceil(response.data.count / 3) || 1);  
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [searchTerm, currentPage]);

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);  
  };


  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Container className="my-5">
      <Typography variant="h3" align="center" gutterBottom>
        All Products
      </Typography>

  
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '50%' }}
        />
      </div>

      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card 
              className="h-70" 
              style={{ backgroundColor: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
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

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </Container>
  );
}
