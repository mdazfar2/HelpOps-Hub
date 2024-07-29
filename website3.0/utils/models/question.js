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

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content:{
    type:String
  },
  authorUsername:String,
  authorEmail:{
type:String
  },
  authorId:{
    type:String
  },

  authorName: {
    type: String,
    default: "",
  },
});

const Questions = mongoose.models.questioncollection || mongoose.model("questioncollection", questionSchema);

export default Questions;
