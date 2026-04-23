import React, { useState } from 'react';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your signup logic here
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="icon-container">
          <svg className="signup-icon" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
            {/* Resume/Document icon */}
            <rect x="40" y="10" width="80" height="110" rx="5" fill="#4A9EFF" stroke="#5BA8FF" strokeWidth="2"/>
            <circle cx="60" cy="35" r="8" fill="white"/>
            <rect x="75" y="30" width="35" height="4" rx="2" fill="white"/>
            <rect x="75" y="40" width="25" height="3" rx="1.5" fill="white"/>
            <line x1="50" y1="60" x2="110" y2="60" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="50" y1="70" x2="110" y2="70" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <line x1="50" y1="80" x2="95" y2="80" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            
            {/* Magnifying glass */}
            <circle cx="145" cy="75" r="30" fill="#1E3A5F" stroke="#5BA8FF" strokeWidth="3"/>
            <circle cx="145" cy="75" r="20" fill="#2C5282" stroke="#4A9EFF" strokeWidth="2"/>
            <circle cx="150" cy="68" r="12" fill="#4A9EFF"/>
            <line x1="165" y1="95" x2="185" y2="115" stroke="#5BA8FF" strokeWidth="6" strokeLinecap="round"/>
            
            {/* User silhouette in magnifying glass */}
            <circle cx="145" cy="70" r="6" fill="white"/>
            <path d="M 135 85 Q 135 78 145 78 Q 155 78 155 85" fill="white"/>
          </svg>
        </div>
        
        <h1 className="signup-title">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
