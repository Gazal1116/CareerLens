import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

function PortfolioPage() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("my");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName") || "User";

  console.log("PortfolioPage mounted. userId:", userId);

  useEffect(() => {
    fetchData();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    if (!token || token === "null" || token === "undefined") {
      return null;
    }
    return { Authorization: `Bearer ${token}` };
  };

  const handleAuthFailure = (message) => {
    if (message === "Token failed" || message === "Session expired, please login again") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      alert("Session expired. Please login again.");
      navigate("/login");
      return true;
    }
    return false;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const headers = getAuthHeader();
      if (!headers) {
        navigate("/login");
        return;
      }
      const res = await axios.get(`${API_BASE_URL}/api/portfolio`, {
        headers
      });
      setPortfolios(res.data.portfolios || []);
    } catch (err) {
      console.error("Error fetching portfolios:", err);
      if (handleAuthFailure(err.response?.data?.message)) return;
      setError("Failed to load portfolios. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const headers = getAuthHeader();
      if (!headers) {
        navigate("/login");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (pdfFile) {
        formData.append("file", pdfFile);
      }

      if (editId) {
        await axios.put(
          `${API_BASE_URL}/api/portfolio/${editId}`,
          { title, description },
          {
            headers
          }
        );
        setEditId(null);
      } else {
        if (!pdfFile) {
          alert("Please select a PDF file to upload");
          return;
        }
        await axios.post(`${API_BASE_URL}/api/portfolio/upload`, formData, {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data"
          }
        });
      }

      setTitle("");
      setDescription("");
      setPdfFile(null);
      fetchData();
    } catch (err) {
      console.error("Error submitting:", err);
      if (handleAuthFailure(err.response?.data?.message)) return;
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      const headers = getAuthHeader();
      if (!headers) {
        navigate("/login");
        return;
      }
      await axios.delete(`${API_BASE_URL}/api/portfolio/${id}`, {
        headers
      });
      fetchData();
    } catch (err) {
      console.error("Error deleting:", err);
      if (handleAuthFailure(err.response?.data?.message)) return;
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleLike = async (id) => {
    try {
      const headers = getAuthHeader();
      if (!headers) {
        navigate("/login");
        return;
      }
      await axios.post(`${API_BASE_URL}/api/portfolio/${id}/like`, {}, {
        headers
      });
      fetchData();
    } catch (err) {
      console.error("Error liking:", err);
      if (handleAuthFailure(err.response?.data?.message)) return;
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleRate = async (id, value) => {
    try {
      const headers = getAuthHeader();
      if (!headers) {
        navigate("/login");
        return;
      }
      await axios.post(`${API_BASE_URL}/api/portfolio/${id}/rate`, {
        rating: value
      }, {
        headers
      });
      fetchData();
    } catch (err) {
      console.error("Error rating:", err);
      if (handleAuthFailure(err.response?.data?.message)) return;
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const myPortfolios = portfolios.filter(p => {
    const portfolioUserId = typeof p.user === 'object' ? p.user._id : p.user;
    return portfolioUserId === userId;
  });
  const others = portfolios.filter(p => {
    const portfolioUserId = typeof p.user === 'object' ? p.user._id : p.user;
    return portfolioUserId !== userId;
  });

  if (!userId) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Please Login First</h1>
          <button onClick={() => navigate("/login")} className="px-6 py-3 bg-purple-600 rounded-lg">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">

      {/* Premium Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gradient-to-b from-slate-900 to-slate-950 p-6 border-r border-slate-800 flex flex-col transition-all duration-300 fixed h-screen`}>
        
        {/* Logo Section */}
        <div className="mb-12">
          <h1 className={`text-3xl font-bold transition-all duration-300 ${!sidebarOpen && 'text-center'}`}>
            <span className="text-purple-500">Career</span>
            {sidebarOpen && <span className="text-purple-400">Lens</span>}
          </h1>
          <div className="h-1 w-12 bg-purple-500 rounded mt-2"></div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 space-y-3">
          
          {/* My Portfolio Button */}
          <button
            onClick={() => setActiveTab("my")}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 ${
              activeTab === "my"
                ? "bg-gradient-to-r from-purple-600 to-purple-500 shadow-lg shadow-purple-500/50"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <span className="text-2xl">📋</span>
            {sidebarOpen && <span className="font-semibold">My Portfolio</span>}
          </button>

          {/* Explore Button */}
          <button
            onClick={() => setActiveTab("all")}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 ${
              activeTab === "all"
                ? "bg-gradient-to-r from-purple-700 to-purple-600 shadow-lg shadow-purple-500/50"
                : "hover:bg-slate-800 text-slate-300"
            }`}
          >
            <span className="text-2xl">🔍</span>
            {sidebarOpen && <span className="font-semibold">Explore</span>}
          </button>

        </nav>

        {/* User Profile Section */}
        <div className="border-t border-slate-800 pt-4 space-y-3">
          
          {sidebarOpen && (
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
              <p className="text-sm text-slate-400">Welcome back</p>
              <p className="font-semibold text-white truncate">{userName}</p>
            </div>
          )}

          {/* Home Button */}
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-slate-800 transition-all duration-300 text-slate-300 hover:text-white"
          >
            <span className="text-xl">🏠</span>
            {sidebarOpen && <span className="font-medium">Home</span>}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-3 rounded-lg hover:bg-red-900/30 transition-all duration-300 text-red-400 hover:text-red-300"
          >
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>

      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-72' : 'ml-20'} flex-1 transition-all duration-300`}>
        <div className="p-12">

          <h2 className="text-4xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-400">
              {activeTab === "my" ? "My Portfolios" : "Explore Portfolios"}
            </span>
          </h2>
          <p className="text-slate-400 mb-8">
            {activeTab === "my" 
              ? "Manage and showcase your professional work" 
              : "Discover amazing portfolios from other professionals"}
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-lg mb-8">
              ❌ {error}
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
              <p className="text-slate-400 mt-4">Loading portfolios...</p>
            </div>
          )}

          {/* Upload Form - Only visible for My Portfolio Tab */}
          {!loading && activeTab === "my" && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl mb-12 border border-slate-700 hover:border-purple-500/50 transition">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">⬆️</span> Upload New Portfolio
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Portfolio Title</label>
                  <input
                    type="text"
                    placeholder="E.g., Web Design Portfolio"
                    className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    placeholder="Describe your portfolio..."
                    className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none transition resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">PDF File</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="application/pdf"
                      className="w-full p-4 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 focus:border-purple-500 focus:outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white cursor-pointer"
                      onChange={(e) => setPdfFile(e.target.files[0])}
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full px-6 py-4 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/50"
                >
                  {editId ? "Update Portfolio" : "Upload Portfolio"}
                </button>
              </form>
            </div>
          )}

          {/* Portfolio Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(activeTab === "my" ? myPortfolios : others).length > 0 ? (
                (activeTab === "my" ? myPortfolios : others).map(item => (
                  <Card 
                    key={item._id} 
                    item={item}
                    isOwner={activeTab === "my"}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onLike={handleLike}
                    onRate={handleRate}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-2xl text-slate-400 mb-4">
                    {activeTab === "my" 
                      ? "No portfolios yet. Create your first one!" 
                      : "No other portfolios available"}
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function Card({ item, isOwner, onDelete, onEdit, onLike, onRate }) {
  const userInitials = item.user?.name
    ? item.user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "U";

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105">

      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white">
          {userInitials}
        </div>
        <div>
          <p className="font-semibold text-white">{item.user?.name || "Anonymous"}</p>
          <p className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <h4 className="text-xl font-semibold mb-3 text-white">{item.title}</h4>
      <p className="text-slate-400 mb-4 line-clamp-2">{item.description}</p>

      <a
        href={`${API_BASE_URL}/${item.pdf}`}
        target="_blank"
        rel="noreferrer"
        className="inline-block mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-all duration-300"
      >
        📄 View PDF
      </a>

      {/* Likes & Ratings */}
      <div className="border-t border-slate-700 pt-4 space-y-3">
        <button 
          onClick={() => onLike(item._id)} 
          className="w-full py-2 px-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium"
        >
          ❤️ Like ({item.likes?.length || 0})
        </button>

        <div className="space-y-3">
          {/* Rating Display */}
          <div className="bg-slate-700/50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">Rating:</span>
              <span className="text-lg font-bold text-yellow-400">
                {item.ratings && item.ratings.length > 0
                  ? (item.ratings.reduce((sum, r) => sum + r.rating, 0) / item.ratings.length).toFixed(1)
                  : "—"} / 5
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(num => (
                <span key={num} className={`text-xl ${
                  item.ratings && item.ratings.length > 0 && 
                  (item.ratings.reduce((sum, r) => sum + r.rating, 0) / item.ratings.length) >= num
                  ? "✅"
                  : "⭕"
                }`}></span>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {item.ratings ? item.ratings.length : 0} rating{item.ratings?.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Rate This */}
          <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-lg">
            <p className="text-xs text-slate-400 mb-2">Rate this:</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => onRate(item._id, num)}
                  className="flex-1 py-2 rounded hover:scale-110 transition-all duration-300 text-xl"
                  title={`${num} star${num !== 1 ? "s" : ""}`}
                >
                  {num <= 3 ? "😐" : num === 4 ? "😊" : "😍"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit & Delete */}
      {isOwner && (
        <div className="flex gap-3 mt-4">
          <button 
            onClick={() => onEdit(item)} 
            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all duration-300"
          >
            ✏️ Edit
          </button>
          <button 
            onClick={() => {
              if (window.confirm("Delete this portfolio?")) {
                onDelete(item._id);
              }
            }} 
            className="flex-1 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-all duration-300"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;