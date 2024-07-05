import mongoose from 'mongoose';

const resources = new mongoose.Schema({
  resourcePath:String,
  likeCount:Number
});

const resource = mongoose.models.resource || mongoose.model("resource", resources);

export default resource;
