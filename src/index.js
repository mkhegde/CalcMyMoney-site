import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This will import your global CSS (we'll add this next)
import App from './App'; // This is your main application component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);