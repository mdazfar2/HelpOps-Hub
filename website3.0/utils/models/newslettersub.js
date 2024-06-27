import mongoose from 'mongoose';

const newsletterModel = new mongoose.Schema({
  email:String,
});

const NewsLetterSubscribe = mongoose.models.newsletteremails || mongoose.model("newsletteremails", newsletterModel);

export default NewsLetterSubscribe;
