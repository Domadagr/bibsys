// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send login request to your API
    // On success, you might store a token (preferably in an HttpOnly cookie)
    // and update your auth state, then navigate to a protected route.
    

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            'user': username,
            'password': password,
        }),
        credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login success: ", data.message);

      /*
      if (tokenJWT) {
        Cookies.set('token', tokenJWT, { expires: 30, HttpOnly: true });
      }
        */

    }
    console.log('Logging in with', { username, password });
    navigate('/');
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
