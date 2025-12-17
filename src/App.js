import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import React from 'react';
import Login from './Login'
import Register from './Register'
import Profile from './Profile';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './userDashboard';
import CreateOrder from './createOrder';

function App() {


  return (
    
    <BrowserRouter>
      <Routes>
      
    
      <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/register" element={<Register />} />     
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/create-order" element={<CreateOrder />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
