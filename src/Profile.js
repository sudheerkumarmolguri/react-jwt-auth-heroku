import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

  const [user, setUser] = useState({});
  
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

   
    axios.get("http://localhost:3000/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log("Backend responseee:", res.data);
      setUser({ email: res.data.email });
    }).catch(() => {});
  }, 
  []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    window.location.href = "/login";  // redirect to login page
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Welcome {user.email}</p>
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
