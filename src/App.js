import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React from 'react';
import Login from './Login'
import Register from './Register'
import Profile from './Profile';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './userDashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />     
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
