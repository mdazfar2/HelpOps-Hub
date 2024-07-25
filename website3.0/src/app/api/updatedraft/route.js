import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Draftblogs from "@utils/models/draftBlogs";

const { MONGO_URI } = process.env;

// Ensure mongoose connects to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose connection instance
const db = mongoose.connection;

// Event handlers for MongoDB connection
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
});

export async function POST(req) {
    
    try {
        let { image, author_id, title, description, id } = await req.json();
      // Create a new draft blog document
      let blog=await Draftblogs.findByIdAndUpdate({_id:id},{
        $set:{
          image: image,
          authorId: author_id,
          title: title,
          description: description,
        }
      },{new:true})
  
      // Save the blog document to MongoDB
   await blog.save();
  
      // Return success response
      return NextResponse.json({ success: true});
    } catch (error) {
      console.error("Error saving draft:", error);
      return NextResponse.json({ success: false, error: error.message });
    }
  }
  
  // Export your database connection instance for reuse
  export { db };
  