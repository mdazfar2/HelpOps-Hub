import Questions from "@utils/models/question"; // Importing Mongoose model for questions collection
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
    const { id, user_id } = await req.json();

    // Validate input
  

    await connectToDatabase();

    // Find the question and toggle the `isCLose` field
    const question = await Questions.findById(id);
    if (!question) {
      return NextResponse.json({ success: false, msg: "Question not found" }, { status: 404 });
    }

    // Toggle the `isCLose` field
    const updatedIsCLose = !question.isCLose;

    // Update the question document
    const updatedQuestion = await Questions.findByIdAndUpdate(
      id,
      { $set: { isCLose: updatedIsCLose } },
      { new: true } // Return the updated document
    );

    // Return success response with updated question details
    return NextResponse.json({ data: updatedQuestion, success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in POST /api/question:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
