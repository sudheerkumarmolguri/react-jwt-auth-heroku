import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const login = async () => {
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login Successful");
       // Clear fields
    setEmail("");
    setPassword("");
    // redirect after login
    if (res.data.user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
    
    //navigate("/profile");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input placeholder="Password" type="password" value={password}
             onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
