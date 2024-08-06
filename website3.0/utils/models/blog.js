import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    name: String,
    image: String,
    username:String
  },
  comment: String,
  likes:{
    type:Number,
    default:0
  },
  likeusers:{
    type:Array,
    default:['a']
  },
  replies:{
    type:Array,
    default:[]
  }
});

const reactionSchema = new mongoose.Schema({
  type: String,
  count: {
    type: Number,
    default: 0,
  },
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  username:String,
  image: {
    type: String  },
  type: {
    type: String,
    required: true,
  },
  authorEmail:{
type:String
  },id:{
    type:String
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
    type: String  },
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
  authorImage:{
    type:String,
    default:""
  },
  authorId:{
    type: String,
    default: "",
  },
  reactionList: {
    type: [reactionSchema],
    default: [],
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
  views:{
    type:Number,
    default:0
  },
  average:{
    type:Number,
    default:0
  },
  tags:{
    type:Array,
    default:[]
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
});

const Blogs = mongoose.models.blogcollection || mongoose.model("blogcollection", blogSchema);

export default Blogs;
