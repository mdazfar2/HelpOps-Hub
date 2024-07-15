import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
 
  description: {
    type: String,
    required: false,
  },
  authorId:{
    type: String,
    default: "",
  }
});

const Draftblogs = mongoose.models.draftblogs || mongoose.model("draftblogs", blogSchema);

export default Draftblogs;
