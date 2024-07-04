import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  length: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mustRead: {
    type: Boolean,
    default: false,
  },
  editorsPick: {
    type: Boolean,
    default: false,
  },
  authorName: {
    type: String,
    default: "",
  },
  authorTitle: {
    type: String,
    default: "",
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Blogs = mongoose.models.blogcollection || mongoose.model("blogcollection", blogSchema);

export default Blogs;
