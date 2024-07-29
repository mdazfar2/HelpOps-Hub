import mongoose from 'mongoose';

const newaccountschema = new mongoose.Schema({
   purpose:{
      type:String
   },
 accounts:{
    type: Object,
    default:{}
 },
 visits:{
    type: Object,
    default:{}
 }
}, {
  timestamps: true // Add timestamps (createdAt, updatedAt)
});

const newaccount = mongoose.models.newaccount || mongoose.model("newaccount", newaccountschema);

export default newaccount;
