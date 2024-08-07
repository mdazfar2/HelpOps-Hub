import user from "@utils/models/user"; // Importing Mongoose model for user collection
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server"; // Importing Next.js server response utility

const MONGO_URI = process.env.MONGO_URI; // Ensure this is defined in your environment

// Helper function to connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
  }
};

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Validate input
    if (!email) {
      return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Find and delete the user by email
    const result = await user.findOneAndDelete({ email });

    if (!result) {
      return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({ success: true, msg: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/delete-user:", error);
    return NextResponse.json({ success: false, msg: "Server error" }, { status: 500 });
  }
}
