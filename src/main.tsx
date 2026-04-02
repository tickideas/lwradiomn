// src/main.tsx
// Application entry point — mounts the React app
// Bootstraps React 19 with StrictMode
// RELEVANT FILES: index.html, src/App.tsx, src/index.css

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
