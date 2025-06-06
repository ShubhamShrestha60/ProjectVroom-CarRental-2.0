
import React, { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./adminLogin.css"

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/adminLogin', {email, password})
    .then(result =>{console.log(result)
      if(result.data === "Success"){
        navigate('/dashboard')
      }
    })
    console.log({
      email,
      password
    });
  };

  return (
    <div className="admin-form">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <div className="col">
            <p>
            Don't have an account yet? <span style={{ color: "#5CB3FF" }}><Link to="/adminsignup">Sign up</Link></span>
            </p>
        </div>

      </form>
    </div>
  );
};

export default AdminLogin;