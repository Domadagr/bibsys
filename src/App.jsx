import React from 'react';
import './style.css';

function App() {
  return (
    <div>
      <button onClick={() => console.log('Login clicked')}>Login</button>
      {/* Render public and protected UI elements conditionally */}
    </div>
  );
}

export default App;