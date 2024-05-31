// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashBoard';
import UserDashboard from './components/UserDashBoard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
