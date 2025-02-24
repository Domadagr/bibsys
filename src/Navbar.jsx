// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav>
      <Link to="/" className="logo">
        
      </Link>
      <ul className="menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/booklist">Books</Link></li>
        {/* other public links */}
      </ul>
      <div className="auth-buttons">
        {/* Login button */}
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;
