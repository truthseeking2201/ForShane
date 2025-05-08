import React from 'react';
import ReactDOM from 'react-dom/client';
import VaultActivity from './VaultActivity';
import './index.css';
import backgroundImage from './assets/Background.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ 
      padding: '20px', 
      minHeight: '100vh',
      position: 'relative',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <VaultActivity />
    </div>
  </React.StrictMode>
); 