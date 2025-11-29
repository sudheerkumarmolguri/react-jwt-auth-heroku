import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/admin/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      console.log("Admin Response:", res.data.user.role);
      setUser({ email: res.data.user.email });
    })
    .catch(err => {
      console.error("Admin Error:", err);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");  // remove JWT token
    window.location.href = "/login";   // redirect to login page
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin: {user.email}</p>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
