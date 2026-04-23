require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { signup , login} = require("./Controllers/authController");
const protect = require("./middleware/authMiddleware");
const Resume = require("./models/resumeModel");
const upload = require("./middleware/uploadMiddleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.post("/api/auth/signup", signup);
app.post("/api/auth/login" , login);

app.get("/api/auth/profile" , protect , (req , res) =>{
  res.json({
    message:"Protected route accessed",
    userId : req.user.id,
  });
});

app.post("/api/auth/resume/upload",protect,upload.single("file"),async(req,res) => {
  try{
    const {title,description} = req.body;
    if(!req.file) {
      return res.status(400).json({message:"No file upload"});
    }
  }
})

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
