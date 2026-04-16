import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Draftblogs from "@utils/models/draftBlogs";

const { MONGO_URI } = process.env;

async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(MONGO_URI);
}

// Define your POST request handler
export async function POST(req) {
  let { image, author_id, title, description } = await req.json();

  try {
    await connectDB();

    // Create a new draft blog document
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
    await connectDB();

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

