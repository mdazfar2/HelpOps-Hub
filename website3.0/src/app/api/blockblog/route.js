import Blogs from "@utils/models/blog"; // Importing Mongoose model for blog collection
import User from "@utils/models/user"; // Importing Mongoose model for user collection
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

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all blog documents
    const blogs = await Blogs.find();

    return NextResponse.json({ data: blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    // Parse JSON payload from request body
    const { user_id, blog_id } = await req.json();

    if (!user_id || !blog_id) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }

    await connectToDatabase();

    // Find the user and update blockedBlogs
    const userToUpdate = await User.findById(user_id);
    
    if (!userToUpdate) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    if (!userToUpdate.blockedBlogs.includes(blog_id)) {
      userToUpdate.blockedBlogs.push(blog_id);
      await userToUpdate.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/block-blog:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
