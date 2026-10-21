import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, trim: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
