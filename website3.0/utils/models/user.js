import mongoose from 'mongoose';

const newsletterModel = new mongoose.Schema({
  email:String,
  password:String,
  name:String,
  image1:{
    type:String,
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
  }
});

const user = mongoose.models.user || mongoose.model("user", newsletterModel);

export default user;
