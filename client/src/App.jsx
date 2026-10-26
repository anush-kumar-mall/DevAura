import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Editor from './pages/Editor';
import AuthCallback from './pages/AuthCallback';
import LegalPage from './pages/LegalPage';

const BACKEND_URL = import.meta.env.PROD 
  ? 'https://devaura-3l4q.onrender.com'
  : 'https://devaura-3l4q.onrender.com';

const socket = io(BACKEND_URL);

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor/:roomId" element={<Editor />} />
        <Route path="/auth-callback" element={<AuthCallback />} />
        <Route path="/privacy-policy" element={<LegalPage />} />
        <Route path="/terms-of-service" element={<LegalPage />} />
        <Route path="/cookie-policy" element={<LegalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


