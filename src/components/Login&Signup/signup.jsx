// import Login from './login.jsx'
import React, { useState } from 'react';
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Component } from "react";
// gi is sort name of game icon.
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import './signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'confirmPassword' || name === 'password') {
      validatePasswords(name === 'password' ? value : formData.password, 
                       name === 'confirmPassword' ? value : formData.confirmPassword);
    }
  };

  const validatePasswords = (password, confirmPassword) => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return '';
    if (password.length < 8) return 'weak';
    if (password.length < 12) return 'moderate';
    return 'strong';
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 'weak':
        return 'Weak - Password should be at least 8 characters';
      case 'moderate':
        return 'Moderate - Consider using a longer password';
      case 'strong':
        return 'Strong password';
      default:
        return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/signup', formData);
      if (response.data === "Success") {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <img src={logo} alt="Vroom Logo" className="signup-logo" />
        <h1 className="signup-title">Create an account</h1>
        <p className="signup-subtitle">Please fill in your information to get started</p>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            className="form-input"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="password-input-container">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {formData.password && (
            <p className={`password-strength ${passwordStrength}`}>
              {getPasswordStrengthText(passwordStrength)}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <div className="password-input-container">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex="-1"
            >
              {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <button type="submit" className="signup-button">
          Create Account
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>

      {showPopup && (
        <div className="success-popup">
          <p>Account created successfully!</p>
        </div>
      )}
    </div>
  );
}