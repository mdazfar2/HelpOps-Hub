import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import { NextResponse } from "next/server"; // Importing Next.js server response utility
import jwt from "jsonwebtoken"; // Importing JSON Web Token for decoding
import bcrypt from "bcrypt"; // Importing bcrypt for hashing passwords
import User from "@utils/models/user"; // Importing Mongoose model for user collection

const { MONGO_URI, JWT_SECRET } = process.env; // Ensure JWT_SECRET is also set in environment variables

// Helper function to connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
  }
};

export async function POST(req) {
  try {
    // Parse JSON payload from request body
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ success: false, error: "Token and password are required" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Decode and verify the token
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET); // Verify token using secret
    } catch (error) {
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 401 });
    }

    const { email } = decodedToken;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user password
    const result = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (result.nModified === 0) {
      return NextResponse.json({ success: false, error: "User not found or password is unchanged" }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Error in POST /api/reset-password:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
