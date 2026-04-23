import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-slate-800 shadow-md">
        <h1 className="text-2xl font-bold text-purple-500">
          CareerLens
        </h1>

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="text-slate-300 hover:text-white transition duration-300"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-300"
          >
            Signup
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Showcase Your Talent <br />
          <span className="text-purple-500">Build Your Portfolio</span>
        </h2>

        <p className="text-slate-400 max-w-2xl mb-10">
          CareerLens allows users to create and share their professional portfolios.
          Explore other profiles, give ratings, and grow together.
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition duration-300"
          >
            Create Portfolio
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl border border-purple-500 hover:bg-purple-600 transition duration-300"
          >
            Login to Continue
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-slate-500 py-6 border-t border-slate-700">
        © 2026 CareerLens. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;