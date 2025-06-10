import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainSite from './pages/MainSite';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;