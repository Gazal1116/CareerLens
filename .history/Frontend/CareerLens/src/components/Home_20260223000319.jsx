function Home() {
  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 sticky top-0 bg-slate-950 z-50">
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

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
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
      <section className="px-10 py-24">
        <h3 className="text-3xl font-bold text-center mb-16 text-purple-400">
          Features
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-slate-900 p-8 rounded-2xl border border-purple-500/20">
            <h4 className="text-xl font-bold mb-4">Create Portfolio</h4>
            <p className="text-slate-400">
              Add projects, achievements and skills in a structured format.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-purple-500/20">
            <h4 className="text-xl font-bold mb-4">Get Likes & Ratings</h4>
            <p className="text-slate-400">
              Community members can rate and appreciate your work.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-purple-500/20">
            <h4 className="text-xl font-bold mb-4">Secure Dashboard</h4>
            <p className="text-slate-400">
              Manage your portfolio securely with authentication.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-900 py-24 px-10">
        <h3 className="text-3xl font-bold text-center mb-16 text-purple-400">
          How It Works
        </h3>

        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h4 className="text-xl font-semibold mb-2">1️⃣ Create Account</h4>
            <p className="text-slate-400">Sign up and set up your professional profile.</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">2️⃣ Add Your Portfolio</h4>
            <p className="text-slate-400">Upload your projects and achievements.</p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">3️⃣ Get Rated</h4>
            <p className="text-slate-400">Receive ratings and recognition from others.</p>
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section className="py-24 px-10">
        <h3 className="text-3xl font-bold text-center mb-16 text-purple-400">
          Community Driven
        </h3>

        <p className="text-center max-w-3xl mx-auto text-slate-400">
          CareerLens connects talented individuals and helps them gain visibility
          through a rating-based system.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center py-24 border-t border-purple-500/20">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Stand Out?
        </h2>

        <button className="px-10 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
          Join CareerLens Now
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-purple-500/20 py-10 px-10 bg-slate-900 text-center">
        <p className="text-slate-400">
          © 2026 CareerLens. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default Home;