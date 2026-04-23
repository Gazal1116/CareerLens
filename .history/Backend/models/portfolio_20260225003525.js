import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    pdfUrl: String,
    user: String,

    likes: [{ type: String }],

    ratings: [
      {
        userId: String,
        value: Number,
      },
    ],
  },
  { timestamps: true }
);

portfolioSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((sum, r) => sum + r.value, 0);
  return (total / this.ratings.length).toFixed(1);
});

export default mongoose.model("Portfolio", portfolioSchema);