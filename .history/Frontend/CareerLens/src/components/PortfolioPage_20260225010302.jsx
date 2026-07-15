import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PortfolioPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [myPortfolios, setMyPortfolios] = useState([]);
  const [allPortfolios, setAllPortfolios] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });
  const [ratingData, setRatingData] = useState({});
  const [activeTab, setActiveTab] = useState("my"); // "my" or "all"
  const [loadingStates, setLoadingStates] = useState({});

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch portfolios
  useEffect(() => {
    if (token) {
      fetchMyPortfolios();
      fetchAllPortfolios();
    }
  }, [token]);

  const fetchMyPortfolios = async () => {
    try {
      const res = await fetch("https://careerlens-1-2gm0.onrender.com/api/portfolio/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMyPortfolios(data.portfolios || []);
    } catch (error) {
      console.error("Error fetching my portfolios:", error);
    }
  };

  const fetchAllPortfolios = async () => {
    try {
      const res = await fetch("https://careerlens-1-2gm0.onrender.com/api/portfolio");
      const data = await res.json();
      setAllPortfolios(data.portfolios || []);
    } catch (error) {
      console.error("Error fetching all portfolios:", error);
    }
  };

  const handleUploadChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.file) {
      alert("Please fill in title and select a file");
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("title", formData.title);
    uploadFormData.append("description", formData.description);
    uploadFormData.append("file", formData.file);

    try {
      setLoadingStates((prev) => ({ ...prev, upload: true }));
      const res = await fetch("https://careerlens-1-2gm0.onrender.com/api/portfolio/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: uploadFormData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Portfolio uploaded successfully!");
        setShowUploadModal(false);
        setFormData({ title: "", description: "", file: null });
        fetchMyPortfolios();
        fetchAllPortfolios();
      } else {
        alert("Upload failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error uploading portfolio:", error);
      alert("Failed to upload portfolio: " + error.message);
    } finally {
      setLoadingStates((prev) => ({ ...prev, upload: false }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editData.title) {
      alert("Please fill in title");
      return;
    }

    try {
      setLoadingStates((prev) => ({ ...prev, edit: true }));
      const res = await fetch(
        `https://careerlens-1-2gm0.onrender.com/api/portfolio/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Portfolio updated successfully!");
        setShowEditModal(false);
        setEditingId(null);
        setEditData({ title: "", description: "" });
        fetchMyPortfolios();
        fetchAllPortfolios();
      } else {
        alert("Update failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error updating portfolio:", error);
      alert("Failed to update portfolio: " + error.message);
    } finally {
      setLoadingStates((prev) => ({ ...prev, edit: false }));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this portfolio?")) {
      return;
    }

    try {
      setLoadingStates((prev) => ({ ...prev, delete: id }));
      const res = await fetch(`https://careerlens-1-2gm0.onrender.com/api/portfolio/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("Portfolio deleted successfully!");
        fetchMyPortfolios();
        fetchAllPortfolios();
      }
    } catch (error) {
      console.error("Error deleting portfolio:", error);
      alert("Failed to delete portfolio");
    } finally {
      setLoadingStates((prev) => ({ ...prev, delete: null }));
    }
  };

  const handleLike = async (id) => {
    try {
      setLoadingStates((prev) => ({ ...prev, [id]: true }));
      const res = await fetch(`https://careerlens-1-2gm0.onrender.com/api/portfolio/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchMyPortfolios();
        fetchAllPortfolios();
      }
    } catch (error) {
      console.error("Error liking portfolio:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleRatingSubmit = async (id) => {
    const { rating, comment } = ratingData[id] || {};
    if (!rating) {
      alert("Please select a rating");
      return;
    }

    try {
      setLoadingStates((prev) => ({ ...prev, [`rate-${id}`]: true }));
      const res = await fetch(
        `https://careerlens-1-2gm0.onrender.com/api/portfolio/${id}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating: parseInt(rating), comment }),
        }
      );

      if (res.ok) {
        alert("Rating submitted successfully!");
        setRatingData((prev) => ({ ...prev, [id]: {} }));
        fetchMyPortfolios();
        fetchAllPortfolios();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to submit rating");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [`rate-${id}`]: false }));
    }
  };

  const openEditModal = (portfolio) => {
    setEditingId(portfolio._id);
    setEditData({
      title: portfolio.title,
      description: portfolio.description,
    });
    setShowEditModal(true);
  };

  const PortfolioCard = ({ portfolio, isOwner = false }) => {
    const userInitials = portfolio.user?.name
      ? portfolio.user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U";

    return (
      <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 hover:border-purple-500 transition">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            {userInitials}
          </div>
          <div>
            <h3 className="text-white font-semibold">{portfolio.user?.name || "Unknown"}</h3>
            <p className="text-xs text-slate-400">
              {new Date(portfolio.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="text-xl font-bold text-white mb-2">{portfolio.title}</h2>
        <p className="text-slate-300 mb-4">{portfolio.description}</p>

        {/* PDF Viewer Button */}
        <button
          onClick={() => window.open(portfolio.pdf, "_blank")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg mb-4 transition"
        >
          📄 Open PDF
        </button>

        {/* Ratings Section */}
        <div className="mb-4 p-3 bg-slate-800 rounded-lg">
          <h4 className="text-sm font-semibold text-purple-400 mb-2">
            Ratings ({portfolio.ratings?.length || 0})
          </h4>
          {portfolio.ratings && portfolio.ratings.length > 0 ? (
            <div className="space-y-2">
              {portfolio.ratings.slice(0, 2).map((r, idx) => (
                <div key={idx} className="text-xs text-slate-300">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < r.rating ? "⭐" : "☆"}
                      </span>
                    ))}
                  </div>
                  {r.comment && <p className="italic mt-1">{r.comment}</p>}
                </div>
              ))}
              {portfolio.ratings.length > 2 && (
                <p className="text-xs text-slate-400">
                  +{portfolio.ratings.length - 2} more rating(s)
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400">No ratings yet</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          {isOwner ? (
            <>
              <button
                onClick={() => openEditModal(portfolio)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-sm"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(portfolio._id)}
                disabled={loadingStates.delete === portfolio._id}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition text-sm disabled:opacity-50"
              >
                {loadingStates.delete === portfolio._id ? "Deleting..." : "🗑️ Delete"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleLike(portfolio._id)}
                disabled={loadingStates[portfolio._id]}
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg transition text-sm disabled:opacity-50"
              >
                ❤️ Like ({portfolio.likes?.length || 0})
              </button>
            </>
          )}
        </div>

        {/* Rating Input - Only for other users' portfolios */}
        {!isOwner && (
          <div className="mt-4 p-3 bg-slate-800 rounded-lg">
            <label className="block text-sm text-slate-300 mb-2">Rate this portfolio</label>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() =>
                    setRatingData((prev) => ({
                      ...prev,
                      [portfolio._id]: {
                        ...(prev[portfolio._id] || {}),
                        rating: star,
                      },
                    }))
                  }
                  className={`text-2xl transition ${
                    ratingData[portfolio._id]?.rating >= star
                      ? "text-yellow-400"
                      : "text-slate-500"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add a comment (optional)"
              value={ratingData[portfolio._id]?.comment || ""}
              onChange={(e) =>
                setRatingData((prev) => ({
                  ...prev,
                  [portfolio._id]: {
                    ...(prev[portfolio._id] || {}),
                    comment: e.target.value,
                  },
                }))
              }
              className="w-full bg-slate-700 text-white px-3 py-2 rounded-lg text-sm mb-2 outline-none border border-slate-600 focus:border-purple-500"
            />
            <button
              onClick={() => handleRatingSubmit(portfolio._id)}
              disabled={loadingStates[`rate-${portfolio._id}`]}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition text-sm disabled:opacity-50"
            >
              {loadingStates[`rate-${portfolio._id}`] ? "Submitting..." : "Submit Rating"}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6 border-b border-slate-700">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-wide cursor-pointer"
        >
          <span className="text-purple-500">Career</span>
          <span className="text-pink-500">Lens</span>
        </h1>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
        >
          ← Back to Home
        </button>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">
          📚 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Portfolio
          </span>
        </h1>

        {/* Tabs and Upload Button */}
        <div className="flex justify-between items-center mb-8 gap-4 flexible-wrap">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("my")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === "my"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              📋 My Portfolio
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              👥 Others Portfolio
            </button>
          </div>

          {activeTab === "my" && (
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition"
            >
              ⬆️ Upload New
            </button>
          )}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === "my" ? (
            myPortfolios.length > 0 ? (
              myPortfolios.map((portfolio) => (
                <PortfolioCard key={portfolio._id} portfolio={portfolio} isOwner={true} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-2xl text-slate-400 mb-4">No portfolios yet</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold"
                >
                  Create Your First Portfolio
                </button>
              </div>
            )
          ) : allPortfolios.length > 0 ? (
            allPortfolios.map((portfolio) => (
              <PortfolioCard key={portfolio._id} portfolio={portfolio} isOwner={false} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-2xl text-slate-400">No portfolios available</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold mb-6">Upload Portfolio</h2>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleUploadChange}
                  placeholder="E.g., My Web Design Portfolio"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleUploadChange}
                  placeholder="Describe your portfolio..."
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500 resize-none"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">PDF File *</label>
                <input
                  type="file"
                  name="file"
                  onChange={handleUploadChange}
                  accept=".pdf"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loadingStates.upload}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {loadingStates.upload ? "Uploading..." : "Upload"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setFormData({ title: "", description: "", file: null });
                  }}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 rounded-lg p-8 max-w-md w-full border border-slate-700">
            <h2 className="text-2xl font-bold mb-6">Edit Portfolio</h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Portfolio title"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Description</label>
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Portfolio description"
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500 resize-none"
                  rows="4"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loadingStates.edit}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {loadingStates.edit ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingId(null);
                    setEditData({ title: "", description: "" });
                  }}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;
