// Navbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <div className="navbar">
        <a className="brand" href="./home">
         <button onClick={() => navigate("/home")}>Back</button>
          Grocerly
        </a>
        <div className="nav-links">
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
