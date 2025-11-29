import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserDashboard() {

  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then((res) => {
      console.log("Backend response:", res.data.user.role);
      console.log("Backend response:", res.data.user.email);

      setUser({ email: res.data.user.email });

    })
    .catch((err) => {
      console.log(err);
    });
  }, []);   // run only once

  const handleLogout = () => {
    localStorage.removeItem("token");  // remove JWT token
    window.location.href = "/login";   // redirect to login page
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {user.email}</p>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
