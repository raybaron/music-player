import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CurrentSongProvider } from './contexts/currentSongContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrentSongProvider>
      <App />
    </CurrentSongProvider>
  </React.StrictMode>,
)
