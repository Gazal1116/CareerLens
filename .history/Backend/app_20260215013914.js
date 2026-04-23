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

//----------AUTHENTICATION--------------
app.get("/api/auth/profile" , protect , (req , res) =>{
  res.json({
    message:"Protected route accessed",
    userId : req.user.id,
  });
});
//-----------RESUME UPLOAD-------------
app.post("/api/auth/resume/upload",protect,upload.single("file"),async(req,res) => {
  try{
    const {title,description} = req.body;
    if(!req.file) {
      return res.status(400).json({message:"No file upload"});
    }
      const newResume = new Resume({
      title,
      description,
      pdf: req.file.path,
      user: req.user.id,
    }); 
    await newResume.save();

     res.status(201).json({
      message: "Resume uploaded successfully",
      resume: newResume,
    });

  }
  catch(error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

//----------ALL RESUMES-----------
app.get("/api/auth/resume", async (req, res) => {
  try {
    const resumes = await Resume.find();

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes: resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching resumes",
      error: error.message,
    });
  }
});

// ---------------GET MY RESUMES -------------

app.get("/api/auth/resume/my", protect, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes: resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your resumes",
      error: error.message,
    });
  }
});

//-------------DELETE RESUME------------
app.delete("/api/auth/resume/:id",protect , async(req,res) => {
  try{
    const resume = await Resume.findById(req.params.id);
    if(!resume) {
      return res.status(404).json ({
        success:false,
        message:"Not founnd",
      });
    }
     if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting resume",
      error: error.message,
    });
  }
});

// ------------- UPDATE RESUME -------------

app.put("/api/auth/resume/:id", protect, async (req, res) => {
  try {
    const { title, description } = req.body;
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
    if (resume.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    resume.title = title || resume.title;
    resume.description = description || resume.description;
    const updatedResume = await resume.save();

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume: updatedResume,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating resume",
      error: error.message,
    });
  }
});

//----------UPDATE RESUME---------
app.put("/api.auth/resume/:id" , protect , async(req,res) => {
  try {
    const resume = await.Resume.find
  }
})

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
