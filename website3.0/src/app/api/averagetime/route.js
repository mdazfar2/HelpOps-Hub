import Blogs from "@utils/models/blog"; // Importing Mongoose model for blog collection
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server"; // Importing Next.js server response utility

// Use a global variable to manage MongoDB connection
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;
  const { MONGO_URI } = process.env;
  await mongoose.connect(MONGO_URI);
  isConnected = true;
};

export async function POST(req) {
  try {
    // Parse JSON payload from request body
    const payload = await req.json();
    const { id, time } = payload;

    if (!id || typeof time !== 'number') {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Fetch the blog document
    const blog = await Blogs.findById(id);

    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    // Update the average time
    blog.average = (blog.average + time) / 2;

    // Save the updated blog document
    await blog.save();

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
