import mongoose from 'mongoose';

const newsletterModel = new mongoose.Schema({
  email:String,
  password:String,
  name:String,
  username:String,
  image1:{
    type:String,
  },
  banner: {
    type: String,
  },
  designation:String,
  caption:String,
  github:String,
  linkedin:String,
  followers: {
    type: Map,
    default:new Map()

  },
  following: {
    type: Map,
    default:new Map()
  },
  reactions:{
    type: Map
  },
  resource:{
    type:Map,
    default:new Map()
  },
  likedBlogs:{
    type:Map,
    default:new Map()
  },
  followedTags:{
    type:Array,
    default:[]
  },
  blockedBlogs:{
    type:Array,
    default:[]
  },
  hidedTags:{
    
    type:Array,
    default:[]
  },
  answers:{
    type:Number,
    default:0
  },
  questions:{
    type:Number,
    default:0
  }
}, {
  timestamps: true // Add timestamps (createdAt, updatedAt)
});

const user = mongoose.models.user || mongoose.model("user", newsletterModel);

export default user;
