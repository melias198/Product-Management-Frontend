import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Navbar } from './components/Layout';
import { Footer } from './components/Layout';
import { Home } from './components/Home';
import { ProductList } from './components/Product';
import { ProductDetail } from './components/ProductDetails';
import { Register } from './components/Registration';
import { Login } from './components/Login';
import { CreateProduct } from './components/ProductCreate';
import { ProductUpdate } from './components/ProductUpdate';
import { AuthProvider } from './components/Auth';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-product" element={<CreateProduct />} />
            <Route path="/products/:id/edit" element={<ProductUpdate />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <App />
  </AuthProvider>
);


