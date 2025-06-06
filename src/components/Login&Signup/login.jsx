import logo from "./logo.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from "react-router-dom";
import { Component } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";  


export default function Test({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array to run the effect only once
 
   
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/login', formData)
      .then(result => {
        console.log(result);
        if (result.data === "Success") {
          localStorage.setItem("isLoggedIn", "true"); // Set isLoggedIn to true in localStorage
          localStorage.setItem("userEmail",formData.email );
          setIsLoggedIn(true);
          setShowPopup(true); // Show popup upon successful login
          setTimeout(() => {
            setShowPopup(false); // Hide popup after some time
            navigate('/home'); // Navigate to home page upon successful login
          }, 2000); // Hide popup after 3 seconds
        }
      })
      .catch(err => console.log(err));
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    Login: {
      width: "80%", 
      maxWidth: "300px", 
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      border: "2px solid #000000",
      padding: "20px",
    },
    email: {
      width: "100%",
      height: "40px",
      marginBottom: "15px",
      border: "1px solid black",
      borderRadius: "10px",
      boxSizing: "border-box",
      paddingLeft: "10px",
    },
    password: {
      width: "100%",
      height: "40px",
      marginBottom: "15px",
      border: "1px solid black",
      borderRadius: "10px",
      boxSizing: "border-box",
      paddingLeft: "10px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontSize: "15px",
    },
    button: {
      backgroundColor: "#5CB3FF",
      width: "100%",
      height: "40px",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      marginTop: "15px",
    },
    img: {
      width: "100%",
      height: "auto",
      marginBottom: "15px",
    },
    forgotPassword: {
      textAlign: "right",
      fontSize: "12px",
      marginTop: "10px",
    },
    signUp: {
      textAlign: "center",
      fontSize: "13px",
      marginTop: "20px",
    },
    popup: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      zIndex: "999",
    },
    password_eye:{
      zIndex: "1001",
      position: "absolute",
      top: "50%",
      right: "10px",
      transform: "translateY(-90%)",
      cursor: "pointer",
    }
  };

  return (
    <div style={styles.container}>
      <form className="Login" style={styles.Login} onSubmit={handleSubmit}>
        <img src={logo} alt="" style={styles.img} />

        <label htmlFor="my-email" style={styles.label}>
          Email
        </label>
        <input id="Email" type="email" style={styles.email} name="email" value={formData.email} onChange={handleChange} required/>

        <label htmlFor="my-password" style={styles.label}>
          Password
        </label>
        <div style={{position:"relative"}}>
        <input id="my-password" 
                 type={showPassword ? "text" : "password"}  
               style={styles.password} 
               name="password" 
               value={formData.password} 
               onChange={handleChange} required />

          {showPassword ? (
            <FaRegEye 
            className='password_eye' 
            style={styles.password_eye} 
            onClick={togglePasswordVisibility} 
          />
            
          ) : (
            <FaRegEyeSlash 
            className='password_eye' 
            style={styles.password_eye} 
            onClick={togglePasswordVisibility} 
            />
          )}
         </div>
        

        <button type="submit" style={styles.button}>Login</button>

        

        <p style={styles.signUp}>
          Don't have an account yet? <span style={{ color: "#5CB3FF" }}><Link to="/signup">Sign up</Link></span>
        </p>
      </form>
     
      {showPopup && (
        <div style={styles.popup}>
          <p>Login Successful!</p>
        </div>
      )}
    </div>
  );
}
Test.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};