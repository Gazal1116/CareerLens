import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleProtectedRoute = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/portfolio");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.href = "/";
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white scroll-smooth min-h-screen">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* NAVBAR */}
      <nav className="relative max-w-7xl mx-auto flex justify-between items-center px-6 py-8 border-b border-slate-800/50 backdrop-blur-md">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold tracking-tight cursor-pointer group"
        >
          <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Career</span>
          <span className="text-purple-400 ml-1">Lens</span>
          <div className="h-1 w-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded group-hover:w-full transition-all duration-500"></div>
        </h1>

        <div className="flex gap-4 items-center">
          {token ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/portfolio")}
                className="px-4 py-2 text-slate-300 hover:text-white transition duration-300 group"
              >
                <span className="group-hover:scale-110 inline-block transition-transform duration-300">📚</span> My Portfolio
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 text-slate-300 hover:text-white transition-all duration-300 hover:border-b-2 hover:border-purple-500 pb-1"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-1 active:scale-95"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto text-center px-6 py-32 md:py-40">
        <div className="mb-8 inline-block">
          <span className="text-sm font-semibold text-purple-400 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/30 backdrop-blur-sm">
            ✨ Showcase Your Professional Work
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl lg:text-7xl font-black leading-tight mb-8 tracking-tight">
          Build Your<br />
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">Professional Identity</span>
        </h2>

        <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Showcase your portfolio, gain recognition from peer reviews, and connect with a community that values talent and expertise.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleProtectedRoute}
            className="px-8 md:px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-1 active:scale-95 group"
          >
            <span className="group-hover:mr-1 transition-all duration-300">→</span> Create Portfolio
          </button>

          <button
            onClick={() => navigate("/portfolio")}
            className="px-8 md:px-10 py-4 rounded-xl border-2 border-purple-500/50 hover:border-purple-500 text-white font-semibold transition-all duration-300 hover:bg-purple-500/10 hover:-translate-y-1 backdrop-blur-sm active:scale-95"
          >
            Explore Portfolios
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-24 md:py-32 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">CareerLens</span>?
            </h3>
            <p className="text-slate-400 text-lg">Everything you need to shine in your career</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📋",
                title: "Smart Portfolio Builder",
                desc: "Upload your work, showcase projects, and highlight your skills with an elegant portfolio interface.",
                gradient: "from-purple-500/20 to-purple-600/10"
              },
              {
                icon: "⭐",
                title: "Community Ratings",
                desc: "Get authentic feedback from peers. Build credibility through real reviews and ratings.",
                gradient: "from-purple-500/20 to-purple-600/10"
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                desc: "Your data is encrypted and secure. Full control over your professional information.",
                gradient: "from-purple-500/20 to-purple-600/10"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`group p-8 rounded-2xl bg-gradient-to-br ${feature.gradient} border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20`}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{feature.desc}</p>
                <div className="h-1 w-0 bg-gradient-to-r from-purple-500 to-transparent rounded group-hover:w-full transition-all duration-500 mt-4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-24 md:py-32 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-8">
            Get Started in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">3 Steps</span>
          </h3>
          <p className="text-slate-400 text-lg mb-16">Simple, straightforward, powerful</p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Sign Up", desc: "Create your free account in seconds" },
              { num: "02", title: "Upload Portfolio", desc: "Share your best work and achievements" },
              { num: "03", title: "Connect & Grow", desc: "Get discovered and rated by professionals" }
            ].map((step, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.num}
                </div>
                <h4 className="text-xl font-bold mt-6 mb-3 group-hover:text-purple-300 transition-colors">{step.title}</h4>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{step.desc}</p>
                {idx < 2 && <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-2xl text-purple-500/50">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 md:py-32 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative p-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500/30 backdrop-blur-sm overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-700/10 blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Grow Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Career</span>?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Join thousands of professionals building their digital presence on CareerLens</p>
              
              <button
                onClick={() => navigate("/signup")}
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-purple-500/40 hover:shadow-purple-500/60 hover:-translate-y-1 active:scale-95"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-slate-800/50 py-12 text-center text-slate-500 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-4">© 2026 CareerLens. Crafted with care.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;