import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './Auth'

export function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);



  function getStoredTokens() {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  }

  async function handleLogout() {
    const { refreshToken } = getStoredTokens();
      try {
        await axios.post(`https://zeroshop.onrender.com/user/logout/`, { refresh: refreshToken });
      } catch (error) {
        console.error("Error blacklisting token:", error);
      }
    
  
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    logout(true);
    window.location.href = '/login'; 
  }



  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
      <div className="container">
        <Link className="navbar-brand text-primary fw-bold" to="/">
          ZERO SHOP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/products">
                Products
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-3">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                { isLoggedIn? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/add-product">
                        Add Product
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-auto">
      <div className="container p-4">
        <div className="text-center p-3">
          © 2024 Zero Shop, Co. | Made by Mohammad Elias
        </div>
      </div>
    </footer>
  );
}
