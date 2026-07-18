const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    github: {
      type: String,
    },
    liveDemo: {
      type: String,
    },
    technologies: [
      {
        type: String,
      },
    ],
    pdf: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);