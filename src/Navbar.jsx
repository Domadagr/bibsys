// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

function Navbar() {
  return (
    <nav className='navbar'>
      <Link to="/" className="logo">
        
      </Link>
      {/* Links to *.jsx files */}
      <ul className="nav-menu">
        <img className="bibsys-logo" src={logo} alt="Bibsys logo"></img>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/booklist">Books</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      <div className="auth-buttons">
        {/* Login button */}
        
      </div>
    </nav>
  );
}

export default Navbar;
