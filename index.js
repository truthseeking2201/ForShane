import React from 'react';
import ReactDOM from 'react-dom/client';
import VaultActivity from './VaultActivity';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ padding: '20px', backgroundColor: '#0F0F0F', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '40px', fontFamily: 'DM Sans, sans-serif' }}>
        NODO AI Vault Activities
      </h1>
      <VaultActivity />
    </div>
  </React.StrictMode>
); 