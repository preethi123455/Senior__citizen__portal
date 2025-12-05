// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="navbar">

        <div className="brand">
          Grocerly
        </div>

        <div className="nav-links">
          <button
            className="nav-button"
            onClick={() => navigate("/home")}
          >
            Back
          </button>

          <a href="/about" className="nav-link">
            About
          </a>

          <a href="/contact" className="nav-link">
            Contact
          </a>

          <a href="/cart" className="nav-link">
            Cart
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
