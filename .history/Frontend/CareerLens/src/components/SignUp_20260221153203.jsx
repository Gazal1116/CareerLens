import React, { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://careerlens-1-2gm0.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Signup Successfully");
    } else {
      console.log(data.message || "Signup failed");
    }

  } catch (e) {
    console.log(e.message);
  }
};

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(15,20,25,0.92), rgba(26,35,50,0.92), rgba(30,58,95,0.9)), url('https://images.unsplash.com/photo-1557683311-eac922347aa1?w=1920&q=80')",
      }}
    >
      {/* Card */}
      <div className="w-full max-w-md bg-gradient-to-br from-slate-800/90 to-slate-900/80 backdrop-blur-2xl border border-blue-400/30 rounded-2xl p-10 shadow-2xl hover:scale-[1.02] transition-all duration-300">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-32 h-24"
            viewBox="0 0 200 150"
          >
            <rect x="40" y="10" width="80" height="110" rx="5" fill="#4A9EFF" />
            <circle cx="60" cy="35" r="8" fill="white" />
            <rect x="75" y="30" width="35" height="4" rx="2" fill="white" />
            <rect x="75" y="40" width="25" height="3" rx="1.5" fill="white" />
            <line x1="50" y1="60" x2="110" y2="60" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="70" x2="110" y2="70" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="80" x2="95" y2="80" stroke="white" strokeWidth="3" strokeLinecap="round" />

             <circle cx="145" cy="75" r="30" fill="#1E3A5F" stroke="#5BA8FF" strokeWidth="3"/>
           <circle cx="145" cy="75" r="20" fill="#2C5282" stroke="#4A9EFF" strokeWidth="2"/>
           <circle cx="150" cy="68" r="12" fill="#4A9EFF"/>
           <line x1="165" y1="95" x2="185" y2="115" stroke="#5BA8FF" strokeWidth="6" strokeLinecap="round"/>

                    {/* User silhouette in magnifying glass */}
           <circle cx="145" cy="70" r="6" fill="white"/>
            <path d="M 135 85 Q 135 78 145 78 Q 155 78 155 85" fill="white"/>
          </svg>
        </div>

        <h1 className="text-white text-3xl font-bold text-center mb-8 tracking-tight">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-slate-900/70 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-slate-900/70 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-slate-900/70 border border-blue-400/30 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-slate-300 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/Login"
            className="text-blue-400 font-semibold hover:text-blue-300 transition"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;


