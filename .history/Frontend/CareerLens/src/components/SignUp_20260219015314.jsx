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
      <div className="relative z-10 w-full max-w-[440px] p-12 bg-gradient-to-br from-[rgba(25,35,55,0.85)] to-[rgba(20,30,48,0.80)] backdrop-blur-[30px] backdrop-saturate-150 border border-blue-400/25 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_120px_rgba(74,158,255,0.08)_inset,0_2px_0_rgba(255,255,255,0.05)_inset] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_35px_90px_rgba(0,0,0,0.8),0_0_150px_rgba(74,158,255,0.12)_inset,0_2px_0_rgba(255,255,255,0.08)_inset] signup-card">
        <div className="flex justify-center mb-6">
          <svg className="w-36 h-28" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
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
        
        <h1 className="text-white text-[34px] font-bold text-center mb-9 tracking-tight" style={{textShadow: '0 2px 20px rgba(74, 158, 255, 0.3), 0 0 40px rgba(74, 158, 255, 0.2)'}}>
          Create Account
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-slate-100 text-xs font-semibold tracking-wider uppercase mb-0.5">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-[rgba(15,25,40,0.7)] border-[1.5px] border-blue-400/25 rounded-xl px-[18px] py-[15px] text-[15px] text-slate-100 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] outline-none shadow-[0_2px_10px_rgba(0,0,0,0.2)_inset] placeholder:text-slate-400/60 focus:border-blue-400 focus:bg-[rgba(20,30,48,0.9)] focus:shadow-[0_0_0_4px_rgba(74,158,255,0.15),0_2px_10px_rgba(0,0,0,0.2)_inset,0_8px_20px_rgba(74,158,255,0.1)] focus:-translate-y-0.5 autofill:shadow-[0_0_0_30px_rgba(15,25,40,0.7)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:rgb(241,245,249)]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-slate-100 text-xs font-semibold tracking-wider uppercase mb-0.5">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-[rgba(15,25,40,0.7)] border-[1.5px] border-blue-400/25 rounded-xl px-[18px] py-[15px] text-[15px] text-slate-100 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] outline-none shadow-[0_2px_10px_rgba(0,0,0,0.2)_inset] placeholder:text-slate-400/60 focus:border-blue-400 focus:bg-[rgba(20,30,48,0.9)] focus:shadow-[0_0_0_4px_rgba(74,158,255,0.15),0_2px_10px_rgba(0,0,0,0.2)_inset,0_8px_20px_rgba(74,158,255,0.1)] focus:-translate-y-0.5 autofill:shadow-[0_0_0_30px_rgba(15,25,40,0.7)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:rgb(241,245,249)]"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-slate-100 text-xs font-semibold tracking-wider uppercase mb-0.5">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-[rgba(15,25,40,0.7)] border-[1.5px] border-blue-400/25 rounded-xl px-[18px] py-[15px] text-[15px] text-slate-100 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] outline-none shadow-[0_2px_10px_rgba(0,0,0,0.2)_inset] placeholder:text-slate-400/60 focus:border-blue-400 focus:bg-[rgba(20,30,48,0.9)] focus:shadow-[0_0_0_4px_rgba(74,158,255,0.15),0_2px_10px_rgba(0,0,0,0.2)_inset,0_8px_20px_rgba(74,158,255,0.1)] focus:-translate-y-0.5 autofill:shadow-[0_0_0_30px_rgba(15,25,40,0.7)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:rgb(241,245,249)]"
            />
          </div>
          
          <button 
            type="submit" 
            className="signup-button mt-3 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white border-none rounded-xl px-4 py-4 text-base font-bold tracking-wide uppercase cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_8px_25px_rgba(59,130,246,0.4),0_2px_0_rgba(255,255,255,0.1)_inset] relative overflow-hidden hover:bg-gradient-to-br hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(59,130,246,0.5),0_2px_0_rgba(255,255,255,0.15)_inset] active:translate-y-0"
          >
            Sign Up
          </button>
        </form>
        
        <p className="text-center mt-7 text-slate-300 text-sm font-normal">
          Already have an account? <a href="/login" className="login-link text-blue-400 no-underline font-semibold transition-all duration-300 relative hover:text-blue-300">Login</a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
