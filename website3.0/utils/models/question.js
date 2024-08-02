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
  authorImage:{
    type:String
  },
  type:{
    type:String,
    default:"General"
  },
  dateTime:{
    type:Date,
    default:Date.now()
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
  likes:{
    type:Array,default:[]
  },comments:{
    type:Array,
    default:[]
  },
  views:{
    type:Number,
    default:0
  },
  isCLose:{
    type:Boolean,
    default:false
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  solutions:{
    type:Array,
    default:[]
  },
  relatedUser:{
    type:Array,
    default:[]
  },
  tags:{
    type:Array,default:[]
  },
  questionrelatedusers:{
    type:Array,defualt:[]
  }
});

const Questions = mongoose.models.questioncollection || mongoose.model("questioncollection", questionSchema);

export default Questions;
