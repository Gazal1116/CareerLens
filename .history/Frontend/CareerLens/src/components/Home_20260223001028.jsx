function Home() {
  return (
    <div className="bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-purple-500">Career</span>
          <span className="text-pink-500">Lens</span>
        </h1>

        <div className="flex gap-6 items-center">
          <button className="text-slate-300 hover:text-white transition">
            Login
          </button>

          <button className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition">
            Signup
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-5xl mx-auto text-center px-6 pt-24 pb-32">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Build your <span className="text-purple-500">Professional Identity</span>
        </h2>

        <p className="text-slate-400 text-lg md:text-xl mb-10">
          Showcase your portfolio, gain recognition, and connect with a community
          that values talent.
        </p>

        <div className="flex justify-center gap-6">
          <button className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
            Create Portfolio
          </button>

          <button className="px-8 py-3 rounded-xl border border-slate-700 hover:border-purple-500 transition">
            Explore Profiles
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-16">
            Why Choose CareerLens?
          </h3>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-8 rounded-2xl bg-slate-800 hover:bg-slate-700 transition">
              <h4 className="text-xl font-semibold mb-4 text-purple-400">
                Portfolio Builder
              </h4>
              <p className="text-slate-400">
                Add projects, skills, achievements and create a powerful digital presence.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800 hover:bg-slate-700 transition">
              <h4 className="text-xl font-semibold mb-4 text-purple-400">
                Community Ratings
              </h4>
              <p className="text-slate-400">
                Receive likes and ratings that boost your credibility.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800 hover:bg-slate-700 transition">
              <h4 className="text-xl font-semibold mb-4 text-purple-400">
                Secure Dashboard
              </h4>
              <p className="text-slate-400">
                Fully secure authentication and personal dashboard access.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-16">
            How It Works
          </h3>

          <div className="grid md:grid-cols-3 gap-12">

            <div>
              <div className="text-4xl font-bold text-purple-500 mb-4">01</div>
              <p className="text-slate-400">Create your account in seconds.</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-purple-500 mb-4">02</div>
              <p className="text-slate-400">Add your projects and achievements.</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-purple-500 mb-4">03</div>
              <p className="text-slate-400">Get rated and grow your visibility.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Grow Your Career?
        </h2>

        <button className="px-10 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
          Join CareerLens
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-10 text-center text-slate-500">
        © 2026 CareerLens. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;