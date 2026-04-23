function Home() {
  return (
    <div className="relative bg-slate-950 text-white overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[180px] rounded-full"></div>
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-pink-500 opacity-30 blur-[180px] rounded-full"></div>

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-16 py-6 relative z-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          CareerLens
        </h1>

        <div className="flex gap-8 items-center">
          <button className="hover:text-purple-400 transition">Login</button>
          <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 hover:scale-105 transition">
            Signup
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-6 relative z-10">
        <h2 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Build Your Career Identity
        </h2>

        <p className="text-slate-300 max-w-3xl text-xl mb-10">
          Create your professional portfolio, showcase your skills, and get rated by the community.
          Stand out and grow your visibility.
        </p>

        <div className="flex gap-8">
          <button className="px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 hover:scale-110 transition shadow-lg shadow-purple-500/40">
            Create Portfolio
          </button>

          <button className="px-10 py-4 rounded-xl border border-purple-500 hover:bg-purple-500/20 transition">
            Login
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-16 py-32 relative z-10">
        <h3 className="text-4xl font-bold text-center mb-20 text-purple-400">
          Powerful Features
        </h3>

        <div className="grid md:grid-cols-3 gap-16">
          <div className="bg-slate-900/60 backdrop-blur-xl p-10 rounded-3xl border border-purple-500/20 hover:scale-105 transition">
            <h4 className="text-2xl font-bold mb-6 text-purple-400">Create Portfolio</h4>
            <p className="text-slate-400 text-lg">
              Upload projects, skills, achievements and build your professional identity.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl p-10 rounded-3xl border border-purple-500/20 hover:scale-105 transition">
            <h4 className="text-2xl font-bold mb-6 text-pink-400">Get Likes & Ratings</h4>
            <p className="text-slate-400 text-lg">
              Community-driven rating system boosts your profile visibility.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl p-10 rounded-3xl border border-purple-500/20 hover:scale-105 transition">
            <h4 className="text-2xl font-bold mb-6 text-blue-400">Secure Dashboard</h4>
            <p className="text-slate-400 text-lg">
              Fully authenticated and secure profile management system.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-900/60 backdrop-blur-xl py-32 px-16 relative z-10">
        <h3 className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          How CareerLens Works
        </h3>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h4 className="text-2xl font-semibold mb-4 text-purple-400">1. Signup</h4>
            <p className="text-slate-400">Create your account in seconds.</p>
          </div>

          <div>
            <h4 className="text-2xl font-semibold mb-4 text-pink-400">2. Add Portfolio</h4>
            <p className="text-slate-400">Upload projects and achievements.</p>
          </div>

          <div>
            <h4 className="text-2xl font-semibold mb-4 text-blue-400">3. Get Rated</h4>
            <p className="text-slate-400">Receive recognition from community members.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-32 relative z-10">
        <h2 className="text-5xl font-bold mb-8 text-purple-400">
          Ready to Stand Out?
        </h2>

        <button className="px-12 py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 hover:scale-110 transition shadow-xl shadow-purple-500/40">
          Join CareerLens Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-purple-500/20 py-12 px-16 bg-slate-950 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400">© 2026 CareerLens. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 text-slate-400">
            <span className="hover:text-purple-400 cursor-pointer">Home</span>
            <span className="hover:text-purple-400 cursor-pointer">Login</span>
            <span className="hover:text-purple-400 cursor-pointer">Signup</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;