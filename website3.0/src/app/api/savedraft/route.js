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
  console.log("Connected to MongoDB");
});

// Define your POST request handler
export async function POST(req) {
  let { image, author_id, title, description } = await req.json();

  try {
    // Create a new draft blog document
console.log(image,description,title,author_id)
    let blog = new Draftblogs({
      image: image||"",
      authorId: author_id,
      title: title||"",
      description: description||"",
    });

    // Save the blog document to MongoDB
  let id=  await blog.save();

    // Return success response
    return NextResponse.json({ success: true,id:id._id});
  } catch (error) {
    console.error("Error saving draft:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
export async function PUT(req) {
  let { image, author_id, title, description, id } = await req.json();

  try {
    // Create a new draft blog document
    let blog=await Draftblogs.findByIdAndUpdate({_id:id},{
      $set:{
        image: image,
        authorId: author_id,
        title: title,
        description: description,
      }
    })
    

    // Save the blog document to MongoDB
  let id=  await blog.save();

    // Return success response
    return NextResponse.json({ success: true});
  } catch (error) {
    console.error("Error saving draft:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

// Export your database connection instance for reuse
export { db };
