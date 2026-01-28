import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Dashboard from './Dashboard.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import './App.css';

function App() {
  useEffect(() => {
    // Redirect to dashboard if already logged in and on login page
    const token = localStorage.getItem('token');
    if (token && window.location.pathname === '/') {
      window.location.href = '/dashboard';
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
