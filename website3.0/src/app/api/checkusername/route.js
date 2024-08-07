import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import user from "@utils/models/user"; // Importing Mongoose model for user collection
import { NextResponse } from "next/server"; // Importing Next.js server response utility

const MONGO_URI = process.env.MONGO_URI; // Ensure this is defined in your environment

// Helper function to connect to MongoDB
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
  }
};

// POST endpoint for user registration
export async function POST(req) {
  try {
    const { email, username, password, image } = await req.json();

    // Validate input
    if (!email || !username || !password) {
      return NextResponse.json({ success: false, msg: "Email, username, and password are required" }, { status: 400 });
    }

    await connectToDatabase();

    // Check if username already exists
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ success: false, msg: "This username is already taken" }, { status: 409 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new user({
      email,
      username,
      password: hashedPassword,
      image,
    });
    await newUser.save();

    // Return success response
    return NextResponse.json({ success: true, msg: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/register:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// PUT endpoint for updating username
export async function PUT(req) {
  try {
    const { id, username } = await req.json();

    if (!id || !username) {
      return NextResponse.json({ success: false, msg: "User ID and username are required" }, { status: 400 });
    }

    await connectToDatabase();

    // Find user by ID and update username
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { $set: { username } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 });
    }

    // Return success response
    return NextResponse.json({ success: true, msg: "Username updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT /api/update-username:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
