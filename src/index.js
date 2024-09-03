import React from 'react';
import ReactDOM from 'react-dom/client';
import { CryptoContextProvider } from './AppContext/CryptoContext';
import reportWebVitals from './reportWebVitals';
import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CryptoContextProvider>
      <App />
    </CryptoContextProvider>
  </React.StrictMode>,
);
reportWebVitals();
