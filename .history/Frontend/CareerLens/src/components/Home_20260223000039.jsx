function Home() {
  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-purple-400">
          CareerLens
        </h1>

        <div className="flex gap-6 items-center">
          <button className="hover:text-purple-400 transition">
            Login
          </button>

          <button className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition">
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-5xl font-extrabold mb-6 text-purple-400">
          Build Your Career Identity
        </h2>

        <p className="text-slate-300 max-w-2xl text-lg mb-8">
          Create your professional portfolio, showcase your skills, and get rated by the community.
        </p>

        <div className="flex gap-6">
          <button className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
            Create Portfolio
          </button>

          <button className="px-8 py-3 rounded-xl border border-purple-500 hover:bg-purple-500/20 transition">
            Login
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-10 px-10 pb-24">

        <div className="bg-slate-900 p-8 rounded-2xl border border-purple-500/20">
          <h3 className="text-xl font-bold mb-4">Create Portfolio</h3>
          <p className="text-slate-400">
            Add your projects and showcase your skills professionally.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-purple-500/20">
          <h3 className="text-xl font-bold mb-4">Get Likes & Ratings</h3>
          <p className="text-slate-400">
            Let others rate and appreciate your work.
          </p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-purple-500/20">
          <h3 className="text-xl font-bold mb-4">Secure Profiles</h3>
          <p className="text-slate-400">
            Safe authentication and protected dashboards.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-purple-500/20 py-10 px-10 bg-slate-900 text-center">
        <p className="text-slate-400">
          © 2026 CareerLens. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default Home;