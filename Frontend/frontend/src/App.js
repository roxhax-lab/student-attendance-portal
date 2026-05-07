import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MarkAttendance from './pages/MarkAttendance';
import LeaveRequest from './pages/LeaveRequest';
import Report from './pages/Report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<MarkAttendance />} />
        <Route path="/leave" element={<LeaveRequest />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;