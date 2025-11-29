import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "./api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await API.post("http://localhost:3000/register", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Registered Successfully");
      navigate("/login"); 
    } catch {
      alert("Error during registration");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input placeholder="Password" type="password"
             onChange={(e) => setPassword(e.target.value)} />
             <br />
      <button onClick={register}>Register</button>
      <p>
        Already have an account?{" "}
        <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Register;
