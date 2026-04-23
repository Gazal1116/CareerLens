import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
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
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login Successful");

        // optional: save token
        localStorage.setItem("token", data.token);

        // redirect example
        window.location.href = "/dashboard";
      } else {
        console.log(data.message || "Login failed");
      }

    } catch (error) {
      console.log(error.message);
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
      
      <div className="w-full max-w-md bg-gradient-to-br from-slate-800/90 to-slate-900/80 backdrop-blur-2xl border border-blue-400/30 rounded-2xl p-10 shadow-2xl hover:scale-[1.02] transition-all duration-300">

        <h1 className="text-white text-3xl font-bold text-center mb-8 tracking-tight">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1"
          >
            Login
          </button>
        </form>

        <p className="text-center text-slate-300 text-sm mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-400 font-semibold hover:text-blue-300 transition"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;