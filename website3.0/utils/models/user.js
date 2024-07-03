import mongoose from 'mongoose';

const newsletterModel = new mongoose.Schema({
  email:String,
  password:String,
  name:String,
  image1:{
    type:String,
    required:true
  }
});

const user = mongoose.models.user || mongoose.model("user", newsletterModel);

export default user;
