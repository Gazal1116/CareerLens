import { useEffect, useState } from "react";
import axios from "axios";

function PortfolioPage() {
  const [portfolios, setPortfolios] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/portfolio");
    setPortfolios(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("pdf", pdfFile);
    formData.append("user", userId);

    if (editId) {
      await axios.put(
        `http://localhost:5000/portfolio/${editId}`,
        { title, description }
      );
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/portfolio", formData);
    }

    setTitle("");
    setDescription("");
    setPdfFile(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/portfolio/${id}`);
    fetchData();
  };

  const handleLike = async (id) => {
    await axios.put(`http://localhost:5000/portfolio/${id}/like`);
    fetchData();
  };

  const handleRate = async (id, value) => {
    await axios.put(`http://localhost:5000/portfolio/${id}/rate`, {
      rating: value
    });
    fetchData();
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const myPortfolios = portfolios.filter(p => p.user === userId);
  const others = portfolios.filter(p => p.user !== userId);

  return (
    <div className="flex bg-slate-950 text-white min-h-screen">

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 p-6 border-r border-slate-800">
        <h1 className="text-2xl font-bold">
          <span className="text-purple-500">Career</span>
          <span className="text-pink-500">Lens</span>
        </h1>
      </div>

      {/* Main */}
      <div className="flex-1 p-10">

        <h2 className="text-3xl font-bold text-purple-500 mb-8">
          Portfolio Hub
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-xl mb-12">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 mb-3 bg-slate-800 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 mb-3 bg-slate-800 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            accept="application/pdf"
            className="w-full p-3 mb-3 bg-slate-800 rounded"
            onChange={(e) => setPdfFile(e.target.files[0])}
          />

          <button className="px-6 py-2 bg-purple-600 rounded hover:bg-purple-700">
            {editId ? "Update" : "Upload"}
          </button>
        </form>

        {/* My Portfolios */}
        <h3 className="text-2xl mb-4">My Portfolios</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {myPortfolios.map(item => (
            <Card key={item._id} item={item}
              isOwner={true}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onLike={handleLike}
              onRate={handleRate}
            />
          ))}
        </div>

        {/* Explore */}
        <h3 className="text-2xl mb-4">Explore</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {others.map(item => (
            <Card key={item._id} item={item}
              isOwner={false}
              onLike={handleLike}
              onRate={handleRate}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

function Card({ item, isOwner, onDelete, onEdit, onLike, onRate }) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl hover:scale-105 transition">

      <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
      <p className="text-slate-400 mb-3">{item.description}</p>

      <a
        href={`http://localhost:5000/uploads/${item.pdf}`}
        target="_blank"
        rel="noreferrer"
        className="text-purple-400 underline"
      >
        View PDF
      </a>

      <div className="flex justify-between mt-4">
        <button onClick={() => onLike(item._id)} className="text-pink-400">
          ❤️ {item.likes}
        </button>

        <div className="flex gap-1">
          {[1,2,3,4,5].map(num => (
            <button
              key={num}
              onClick={() => onRate(item._id, num)}
              className="text-yellow-400"
            >
              ⭐
            </button>
          ))}
        </div>
      </div>

      {isOwner && (
        <div className="flex justify-between mt-4">
          <button onClick={() => onEdit(item)} className="text-blue-400">
            Edit
          </button>
          <button onClick={() => onDelete(item._id)} className="text-red-400">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;