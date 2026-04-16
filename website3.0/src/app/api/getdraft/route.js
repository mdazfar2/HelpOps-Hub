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
  let { id} = await req.json();

  try {
    await connectDB();

    // Create a new draft blog document

   

    // Save the blog document to MongoDB
  let blog=  await Draftblogs.findById({_id:id});

    // Return success response
    return NextResponse.json({ success: true,blog:blog});
  } catch (error) {
    console.error("Error saving draft:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
export async function DELETE(req) {
  let { id} = await req.json();

  try {
    await connectDB();

    // Create a new draft blog document

   

    // Save the blog document to MongoDB
  let blog=  await Draftblogs.findByIdAndDelete({_id:id});

    // Return success response
    return NextResponse.json({ success: true});
  } catch (error) {
    console.error("Error saving draft:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

